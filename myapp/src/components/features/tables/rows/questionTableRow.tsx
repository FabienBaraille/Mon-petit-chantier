"use client";

import { TableRow } from "@mui/material";

import { EditElmtButton } from "../../button/editElmtButton";
import { QuestionData } from "../../../../../app/admin/questions/page";

export const QuestionTableRow = (props: QuestionData) => {
  return (
    <TableRow>
      <td>{props.title}</td>
      <td>{props.infos}</td>
      <td>
        <EditElmtButton elmtId={props.id} />
      </td>
    </TableRow>
  )
}