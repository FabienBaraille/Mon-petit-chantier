import { availableDirection, availableRowsPerPage, rowsId } from "../../components/features/tables/tableInfos";

export const paramsUserCheck = (page: number, perPage: number, colSorted: string, direction: string, count: number, baseURL: string): string | null => {
  let isError = false;
  const searchParams = new URLSearchParams();
  // Chercher comment récupérer directement tous les search params
  searchParams.set('page', page.toString());
  searchParams.set('per', perPage.toString());
  searchParams.set('sort', colSorted);
  searchParams.set('dir', direction);

  if (page > Math.ceil(count/perPage) - 1) {
    searchParams.set('page', (Math.ceil(count/perPage) - 1).toString());
    isError = true;
  }
  if (!availableRowsPerPage.includes(perPage)) {
    searchParams.set('per', availableRowsPerPage[0].toString());
    isError = true;
  }
  if (colSorted !== '' && !rowsId.includes(colSorted)) {
    searchParams.delete('sort');
    searchParams.delete('dir');
    isError = true;
  }
  if (!availableDirection.includes(direction)) {
    searchParams.set('dir', availableDirection[0]);
    isError = true;
  }
  if (isError) {
    return `${baseURL}?${searchParams.toString()}`
  } else {
    return null;
  }
}