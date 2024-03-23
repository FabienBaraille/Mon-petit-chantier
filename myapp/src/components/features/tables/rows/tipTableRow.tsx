"use client";

import { TableRow } from "@mui/material"
import { TipData } from "../../../../../app/admin/tips/page"
import { EditElmtButton } from "../../button/editElmtButton";

export const TipTableRow = (props: TipData) => {
  return (
    <TableRow>
      <td>{props.title}</td>
      <td>{props.description}</td>
      <td>{props.itemId ? "Item" :
            props.groupId ? "Groupe" :
              props.questionId ? "Question" :
                "Aucun"}</td>
      <td><EditElmtButton elmtId={props.id} /></td>
    </TableRow>
  )
}