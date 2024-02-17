"use client";

import { IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export type CustomTablePaginationProps = {
  count: number
};

export const CustomTablePagination = (props: CustomTablePaginationProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const baseUrl = usePathname();
  const currentPage = Number(searchParams.get('page') ?? 0) ?? 0;
  const currentRowsPerPage = Number(searchParams.get('perPage') ?? 50) ?? 50;

  const [rowsPerPage, setRowsPerPage] = useState<string>(currentRowsPerPage.toString());

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
      const pageNumber = event.currentTarget.id === "prev" ? currentPage - 1 : currentPage + 1;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', String(pageNumber));
      const url = `${baseUrl}?${newSearchParams.toString()}`;
      router.push(url);
    }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(event.currentTarget.value);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('perPage', event.currentTarget.value);
    newSearchParams.set('page', '0');
    const url = `${baseUrl}?${newSearchParams.toString()}`;
    router.push(url);
  }

  // Mise en forme à faire

  return (
    <>
      <label htmlFor="rowsPerPage">Entrées par page</label>
      <select name="rowsPerPage" id="rows_select" onChange={handleChangeRowsPerPage} defaultValue={Number(rowsPerPage)}>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="10">10</option>
      </select>
      {`${(currentPage*currentRowsPerPage)+1} - ${((currentPage+1)*currentRowsPerPage)}`}
      <IconButton id="prev" onClick={handleChangePage} disabled={currentPage === 0} ><ArrowBackIosIcon /></IconButton>
      <IconButton id="next" onClick={handleChangePage} disabled={ (currentPage+1)*currentRowsPerPage >= props.count } ><ArrowForwardIosIcon /></IconButton>
    </>
  )
}