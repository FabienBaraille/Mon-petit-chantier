import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { Table, TableBody } from "@mui/material";

import { getGroupById, getGroupsPartialTitle, getSortedGroups } from "@/Utils/Request/groupsQuery";
import { searchParamsCheck } from "@/Utils/searchParams/searchParamsCheck";

import { MyTableContainer } from "@/components/Theme/Custom/MyTableContainer";
import { NewElmtButton } from "@/components/features/button/newElmtButton";
import { CustomTableHead } from "@/components/features/tables/common/customTableHead";
import { SearchBar } from "@/components/features/tables/common/searchBar";
import { CustomTablePagination } from "@/components/features/tables/common/customTablePagination";
import { availableRowsPerPage, groupRowsId, groupRowsName, notSortableGroupRowsName } from "@/components/features/tables/tableInfos";
import { GroupTableRow } from "@/components/features/tables/rows/groupTableRow";

import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";
import { GroupFormModal } from "./GroupFormModal";

export type GroupData = {
  id: string,
  title: string,
  rank: number,
  _count: {
    questions: number
  }
};

export type GroupInfoData = {
  id: string,
  title: string,
  infos: string | null,
  rank: number,
  questions: {
    id: string,
    question: {
      id: string,
      title: string
    }
  }[],
}

export default async function GroupPage({
  searchParams
}: {
  searchParams : {[key: string]: string | undefined}
}) {

  const search = searchParams.search ?? null;
  const currentPage = Number(searchParams?.page ?? 0) ?? 0;
  const rowsPerPage = Number(searchParams?.rows ?? availableRowsPerPage[availableRowsPerPage.length - 1]) ?? availableRowsPerPage[availableRowsPerPage.length - 1];
  const colSorted = searchParams?.sort ?? '';
  const order = searchParams?.order ?? '';
  const show = searchParams?.show ? true : false;
  const groupId = searchParams?.id ?? null;

  let totalGroups = await prisma.group.count();

  if (!search) {
    searchParamsCheck(currentPage, rowsPerPage, colSorted, order, totalGroups, groupRowsId, "/admin/groups");
  }

  let groupsList: GroupData[] | null = null;
  
  if (search) {
    groupsList = await getGroupsPartialTitle(search);
    totalGroups = groupsList ? groupsList.length : 0;
  } else {
    let sortOrder = undefined;
    if (colSorted !== "") {
      sortOrder = {[colSorted]: order};
    }
    groupsList = await getSortedGroups(sortOrder, rowsPerPage, currentPage);
  }

  let groupInfo: GroupInfoData | null = null;

  if (groupId) {
    groupInfo = await getGroupById(groupId);
  }

  if (!groupsList) {
    redirect("/error/403");
  }

  return (
    <>
      <MyTableContainer className="custom-table">
        <SearchBar placeholder="Titre" default={search} />
          <Table>
            <CustomTableHead rowsId={groupRowsId} rowsName={groupRowsName} notSortableRows={notSortableGroupRowsName} />
            <Suspense fallback={<LoadingSkeletonAdmin count={rowsPerPage} />}>
              <TableBody>
                {totalGroups === 0 ?
                  <tr className="m-2">
                    <td>Aucun</td>
                    <td>groupe</td>
                  </tr> :
                  groupsList.map((group, index) => <GroupTableRow key={`g${index}`} {...group} />)
                }
              </TableBody>
            </Suspense>
          </Table>
          <CustomTablePagination count={totalGroups} />
      </MyTableContainer>
      <NewElmtButton name="un groupe" />
      {show && <GroupFormModal groupId={groupId} groupInfos={groupInfo} />}
    </>
  )
}