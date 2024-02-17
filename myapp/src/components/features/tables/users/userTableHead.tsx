"use client";

import { TableCell, TableHead, TableRow } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TableHeadCell } from "../tableHeadCell";

export type UserTableHeadProps = {};

export const UserTableHead = (props: UserTableHeadProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const baseUrl = usePathname();
  const sortedCol = searchParams.get('sort');
  const direction = searchParams.get('dir');

  const changeSort = (id: string) => {
    const newDirection = sortedCol !== id ? 'asc' : direction === 'asc' ? 'desc' : 'asc';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', id);
    newSearchParams.set('dir', newDirection);
    newSearchParams.set('page', '0');
    const url = `${baseUrl}?${newSearchParams.toString()}`;
    router.push(url);
  }

  return (
    <TableHead>
      <TableRow>
        <TableHeadCell 
          id="email" 
          name="Email" 
          direction={direction} 
          sortedCol={sortedCol} 
          handleChange={changeSort}
        />
        <TableHeadCell 
          id="role" 
          name="Role" 
          direction={direction} 
          sortedCol={sortedCol} 
          handleChange={changeSort}
        />
        <TableHeadCell 
          id="status" 
          name="Statut" 
          direction={direction} 
          sortedCol={sortedCol} 
          handleChange={changeSort}
        />
        <TableCell>Editer</TableCell>
      </TableRow>
    </TableHead>
  )
}