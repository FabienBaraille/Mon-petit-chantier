import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Item } from "@prisma/client";

import { Table, TableBody } from "@mui/material";

import { searchParamsCheck } from "@/Utils/searchParams/searchParamsCheck";
import { getItemsPartialName, getSortedItems, getItemById } from "@/Utils/Request/itemsQuery";

import { MyTableContainer } from "@/components/Theme/Custom/MyTableContainer";

import { NewElmtButton } from "@/components/features/button/newElmtButton";
import { CustomTableHead } from "@/components/features/tables/common/customTableHead";
import { CustomTablePagination } from "@/components/features/tables/common/customTablePagination";
import { SearchBar } from "@/components/features/tables/common/searchBar";
import { ItemTableRow } from "@/components/features/tables/rows/itemTableRow";
import { availableRowsPerPage, itemRowsId, itemRowsName } from "@/components/features/tables/tableInfos";

import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";
import { ItemFormModal } from "./ItemFormModal";

export type ItemData = {
  id: string,
  name: string,
  rank: string,
  unit: string | null,
  status: string
}

export default async function ItemPage({
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
  const itemId = searchParams?.id ?? null;

  let totalItems = await prisma.item.count();

  if (!search) {
    searchParamsCheck(currentPage, rowsPerPage, colSorted, order, totalItems, itemRowsId, '/admin/items')
  }

  let itemsList: ItemData[] | null = null;

  if (search) {
    itemsList = await getItemsPartialName(search);
    totalItems = itemsList ? itemsList.length : 0;
  } else {
    let sortOrder = undefined;
    if (colSorted !== '') {
      sortOrder = {[colSorted]: order}
    }
    itemsList = await getSortedItems(sortOrder, rowsPerPage, currentPage);
  }

  let itemInfo: Item | null = null;

  if (itemId) {
    itemInfo = await getItemById(itemId);
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
                itemsList.map((item, index) => <ItemTableRow key={`i${index}`} {...item} />)
              }
            </TableBody>
          </Suspense>
        </Table>
        <CustomTablePagination count={totalItems} />
      </MyTableContainer>
      <NewElmtButton name="un item" />
      {show && <ItemFormModal itemId={itemId} itemInfo={itemInfo} />}
    </>
  )
}