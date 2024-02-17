import { TableCell, IconButton } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SortIcon from '@mui/icons-material/Sort';

export type TableHeadCellProps = {
  name: string,
  id: string,
  handleChange: Function,
  direction: string | null,
  sortedCol: string | null
};

export const TableHeadCell = (props: TableHeadCellProps) => {
  return (
    <TableCell>
      {props.name}<IconButton id={props.id} onClick={(event) => props.handleChange(event.currentTarget.id)}>
        {props.sortedCol !== props.id ? <SortIcon /> : props.direction === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </IconButton>
    </TableCell>
  )
}