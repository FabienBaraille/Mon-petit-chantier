"use client";

import { TableRow, IconButton } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import EditIcon from '@mui/icons-material/Edit';
import { UserData } from "../../../../../app/admin/users/page";

export const UserTableRow = (props: UserData) => {
  return (
    <TableRow>
      <td>{props.email}</td>
      <td>{props.role}</td>
      <td>{props.status === "ENABLED" ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</td>
    </TableRow>
  )
}