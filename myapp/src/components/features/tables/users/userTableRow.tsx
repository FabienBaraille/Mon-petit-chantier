"use client";

import { TableRow, IconButton } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import { UserData } from "../../../../../app/admin/users/page";

export const UserTableRow = (props: UserData) => {
  return (
    <TableRow>
      <td>{props.email}</td>
      <td>{props.role}</td>
      <td>{props.status}</td>
      <td>
        <IconButton className="classic-button" id={props.id} onClick={(event) => console.log(event.currentTarget.id)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </td>
    </TableRow>
  )
}