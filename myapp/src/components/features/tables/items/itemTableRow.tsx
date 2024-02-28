"use client";

import { TableRow } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { ItemData } from "../../../../../app/admin/items/page";
import { EditElmtButton } from "../../button/editElmtButton";

export const ItemTableRow = (props: ItemData) => {
  return (
    <TableRow>
      <td>{props.name}</td>
      <td>{props.rank}</td>
      <td>{props.unit}</td>
      <td>{props.status === "UNABLED" ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</td>
      <td>
        <EditElmtButton elmtId={props.id} />
      </td>
    </TableRow>
  )
}