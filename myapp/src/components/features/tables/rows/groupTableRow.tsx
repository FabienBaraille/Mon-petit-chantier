"use client";

import { TableRow } from "@mui/material";
import { GroupData } from "../../../../../app/admin/groups/page";
import { EditElmtButton } from "../../button/editElmtButton";

export const GroupTableRow = (props: GroupData) => {
  return (
    <TableRow>
      <td>{props.title}</td>
      <td>{props.rank}</td>
      <td>{props._count.questions}</td>
      <td><EditElmtButton elmtId={props.id} /></td>
    </TableRow>
  )
}