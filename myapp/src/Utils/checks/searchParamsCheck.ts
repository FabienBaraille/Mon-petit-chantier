import { redirect } from "next/navigation";
import { availableOrder, availableRowsPerPage, rowsId } from "../../components/features/tables/tableInfos";

export const paramsUserCheck = (page: number, perPage: number, colSorted: string, order: string, count: number, baseURL: string) => {
  let isError = false;
  const searchParams = new URLSearchParams();

  if (page > Math.ceil(count/perPage) - 1) {
    searchParams.set('page', (Math.ceil(count/perPage) - 1).toString());
    isError = true;
  } else {
    searchParams.set('page', page.toString());
  }
  if (!availableRowsPerPage.includes(perPage)) {
    searchParams.set('rows', availableRowsPerPage[availableRowsPerPage.length - 1].toString());
    isError = true;
  } else {
    searchParams.set('rows', perPage.toString());
  }
  if (colSorted !== '' && !rowsId.includes(colSorted)) {
    searchParams.delete('sort');
    searchParams.delete('order');
    isError = true;
  } else if (colSorted !== '') {
    searchParams.set('sort', colSorted);
  }
  if (searchParams.get('sort') && order !== '' && !availableOrder.includes(order)) {
    searchParams.set('order', availableOrder[0]);
    isError = true;
  } else if (searchParams.get('sort') && order !== '') {
    searchParams.set('order', order);
  }
  if (isError) {
    redirect(`${baseURL}?${searchParams.toString()}`)
  }
}