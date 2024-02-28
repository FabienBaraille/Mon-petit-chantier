"use client";

import { TableCell, TableHead, TableRow } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TableHeadCell } from "./tableHeadCell";

export type CustomTableHeadProps = {rowsId: string[], rowsName: string[]};

// Voir pour utiliser les props pour en faire un générique

export const CustomTableHead = (props: CustomTableHeadProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const baseUrl = usePathname();
  const sortedCol = searchParams.get('sort');
  const order = searchParams.get('order');

  const changeSort = (id: string) => {
    const newOrder = sortedCol !== id ? 'asc' : order === 'asc' ? 'desc' : 'asc';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', id);
    newSearchParams.set('order', newOrder);
    newSearchParams.set('page', '0');
    const url = `${baseUrl}?${newSearchParams.toString()}`;
    router.push(url);
  }

  return (
    <TableHead>
      <TableRow>
        {props.rowsId.map((rowId, index) =>
          <TableHeadCell
            key={index}
            id={rowId}
            name={props.rowsName[index]}
            order={order}
            sortedCol={sortedCol}
            handleChange={changeSort}
          />
        )}
        <th>Editer</th>
      </TableRow>
    </TableHead>
  )
}