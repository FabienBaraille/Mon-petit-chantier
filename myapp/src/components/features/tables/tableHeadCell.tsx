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
      {props.name}
      <IconButton 
        className="classic-button" 
        id={props.id} 
        onClick={(event) => props.handleChange(event.currentTarget.id)}
      >
        {props.sortedCol !== props.id ? <SortIcon fontSize="small" /> :
          props.direction === 'asc' ? <ArrowDownwardIcon fontSize="small" /> :
            <ArrowUpwardIcon fontSize="small" />
        }
      </IconButton>
    </TableCell>
  )
}