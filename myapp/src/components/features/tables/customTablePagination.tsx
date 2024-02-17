"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './tableStyle.css';

export type CustomTablePaginationProps = {
  count: number
};

export const CustomTablePagination = (props: CustomTablePaginationProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const baseUrl = usePathname();
  const currentPage = Number(searchParams.get('page') ?? 0) ?? 0;
  const currentRowsPerPage = Number(searchParams.get('per') ?? 50) ?? 50;

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
    newSearchParams.set('per', event.currentTarget.value);
    newSearchParams.set('page', '0');
    const url = `${baseUrl}?${newSearchParams.toString()}`;
    router.push(url);
  }

  return (
    <div className="table-footer" >
      <label htmlFor="rowsPerPage">Entrées par page</label>
      <select 
        name="rowsPerPage"
        id="rows_select"
        onChange={handleChangeRowsPerPage}
        defaultValue={Number(rowsPerPage)}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      {`${(currentPage*currentRowsPerPage)+1} - ${((currentPage+1)*currentRowsPerPage) < props.count ? ((currentPage+1)*currentRowsPerPage) : props.count}`}
      <IconButton 
        className="classic-button"
        id="prev"
        onClick={handleChangePage}
        disabled={currentPage === 0}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton 
        className="classic-button" 
        id="next" onClick={handleChangePage} 
        disabled={ (currentPage+1)*currentRowsPerPage >= props.count }
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  )
}