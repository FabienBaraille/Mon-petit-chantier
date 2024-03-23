import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { Table, TableBody } from "@mui/material";

import { getSortedTips, getTipById, getTipsPartialTitle } from "@/Utils/Request/tipQuery";
import { searchParamsCheck } from "@/Utils/searchParams/searchParamsCheck";

import { MyTableContainer } from "@/components/Theme/Custom/MyTableContainer";
import { availableRowsPerPage, notSortableTipsRowsName, tipsRowsId, tipsRowsName } from "@/components/features/tables/tableInfos";
import { CustomTableHead } from "@/components/features/tables/common/customTableHead";
import { SearchBar } from "@/components/features/tables/common/searchBar";
import { CustomTablePagination } from "@/components/features/tables/common/customTablePagination";
import { TipTableRow } from "@/components/features/tables/rows/tipTableRow";
import { NewElmtButton } from "@/components/features/button/newElmtButton";

import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";
import { ItemData } from "../items/page";
import { GroupData } from "../groups/page";
import { QuestionData } from "../questions/page";
import { getAllGroups } from "@/Utils/Request/groupsQuery";
import { getAllItems } from "@/Utils/Request/itemsQuery";
import { getAllQuestions } from "@/Utils/Request/questionsQuery";
import { TipFormModal } from "./TipFormModal";

export type TipData = {
  id: string,
  title: string,
  description: string | null,
  link: string | null,
  groupId: string | null,
  questionId: string | null,
  itemId: string | null,
}

export default async function TipsPage({
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
  const tipId = searchParams?.id ?? null;

  let totalTips = await prisma.tip.count();

  if (!search) {
    searchParamsCheck(currentPage, rowsPerPage, colSorted, order, totalTips, tipsRowsId, "/admin/tips");
  }

  let tipsList: TipData[] | null = null;

  if (search) {
    tipsList = await getTipsPartialTitle(search);
    totalTips = tipsList ? tipsList.length : 0;
  } else {
    let sortOrder = undefined;
    if (colSorted !== "") {
      sortOrder = {[colSorted]: order}
    }
    tipsList = await getSortedTips(sortOrder, rowsPerPage, currentPage);
  }

  let tipInfos: TipData | null = null;
  let referenceType: string = "itemId";
  let referenceId: string | null = null;
  let referenceList: ItemData[] | GroupData[] | QuestionData[] = await getAllItems();

  if (tipId) {
    tipInfos = await getTipById(tipId);
    if (tipInfos?.groupId) {
      referenceType = "groupId";
      referenceId = tipInfos.groupId;
      referenceList = await getAllGroups();
    }
    if (tipInfos?.itemId) {
      referenceId = tipInfos.itemId;
    }
    if (tipInfos?.questionId) {
      referenceType = "questionId";
      referenceId = tipInfos.questionId;
      referenceList = await getAllQuestions();
    }
  }

  if (!tipsList) {
    redirect("/error/403");
  }

  return (
    <>
      <MyTableContainer className="custom-table">
        <SearchBar placeholder="Titre" default={search} />
        <Table>
          <CustomTableHead rowsId={tipsRowsId} rowsName={tipsRowsName} notSortableRows={notSortableTipsRowsName} />
          <Suspense fallback={<LoadingSkeletonAdmin count={rowsPerPage} />}>
            <TableBody>
              {totalTips === 0 ?
                <tr className="m-2">
                  <td>Aucune</td>
                  <td>astuce</td>
                </tr> :
                tipsList.map((tip, index) => <TipTableRow key={`t${index}`} {...tip} />)
              }
            </TableBody>
          </Suspense>
        </Table>
        <CustomTablePagination count={totalTips} />
      </MyTableContainer>
      <NewElmtButton name="une astuce" />
      {show && <TipFormModal tipId={tipId} tipInfos={tipInfos} referenceType={referenceType} referenceId={referenceId} referenceList={referenceList} />}
    </>
  )
}