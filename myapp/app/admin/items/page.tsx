import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

import { Table, TableBody } from "@mui/material";

import { getItemById, getItemsPartialName, getSortedItems } from "@/Utils/request/itemsQuery";
import { searchParamsCheck } from "@/Utils/searchParams/searchParamsCheck";

import { CustomTableHead } from "@/components/features/tables/common/customTableHead";
import { CustomTablePagination } from "@/components/features/tables/common/customTablePagination";
import { SearchBar } from "@/components/features/tables/common/searchBar";
import { availableRowsPerPage, itemRowsId, itemRowsName } from "@/components/features/tables/tableInfos";
import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";
import { ItemTableRow } from "@/components/features/tables/items/itemTableRow";
import { MyTableContainer } from "@/components/Theme/Custom/MyTableContainer";
import { ItemModal } from "@/components/features/modal/ItemModal";
import { NewElmtButton } from "@/components/features/button/newElmtButton";
import { Item } from "@prisma/client";

export type ItemData = {
  id: string,
  name: string,
  rank: string,
  unit: string | null,
  status: string
}

export default async function AnswerPage({
  searchParams
}: {
  searchParams : {[key: string]: string | undefined}
}) {

  const session = await getAuthSession();

  const role = session?.user.role;

  const search = searchParams.search ?? null;
  const currentPage = Number(searchParams?.page ?? 0) ?? 0;
  const rowsPerPage = Number(searchParams?.rows ?? availableRowsPerPage[availableRowsPerPage.length - 1]) ?? availableRowsPerPage[availableRowsPerPage.length - 1];
  const colSorted = searchParams?.sort ?? '';
  const order = searchParams?.order ?? '';
  const show = searchParams?.show ? true : false;
  const isEdit = searchParams?.edit ? true : false;
  const itemId = searchParams?.itemid ?? null;

  console.log(searchParams?.rows);
  

  let totalItems = await prisma.item.count();

  if (!search) {
    searchParamsCheck(currentPage, rowsPerPage, colSorted, order, totalItems, itemRowsId, '/admin/items')
  }

  let itemsList: ItemData[] | null = null;

  if (search) {
    itemsList = await getItemsPartialName(role, search);
    totalItems = itemsList ? itemsList.length : 0;
  } else {
    let sortOrder = undefined;
    if (colSorted !== '') {
      sortOrder = {[colSorted]: order}
    }
    itemsList = await getSortedItems(role, sortOrder, rowsPerPage, currentPage);
  }

  let itemInfo: Item | null = null;

  if (itemId) {
    itemInfo = await getItemById(role, itemId);
  }

  if (!itemsList) {
    redirect("/error/403");
  }

  return (
    <>
      <MyTableContainer  className="custom-table">
        <SearchBar placeholder="Nom" default={search} />
        <Table>
          <CustomTableHead rowsId={itemRowsId} rowsName={itemRowsName} />
          <Suspense fallback={<LoadingSkeletonAdmin count={rowsPerPage} />} >
            <TableBody>
              {totalItems === 0 ?
                <tr className="m-2">
                  <td>Aucun</td>
                  <td>item</td>
                  <td>existant</td>
                </tr> :
                itemsList.map((item, index) => <ItemTableRow key={index} {...item} />)
              }
            </TableBody>
          </Suspense>
        </Table>
        <CustomTablePagination count={totalItems} />
      </MyTableContainer>
      <NewElmtButton name="un item" />
      {show && <ItemModal isEdit={isEdit} itemId={itemId} itemInfo={itemInfo} />}
    </>
  )
}