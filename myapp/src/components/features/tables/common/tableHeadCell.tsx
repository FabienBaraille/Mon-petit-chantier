import { IconButton } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SortIcon from '@mui/icons-material/Sort';

export type TableHeadCellProps = {
  name: string,
  id: string,
  handleChange: Function,
  order: string | null,
  sortedCol: string | null
};

export const TableHeadCell = (props: TableHeadCellProps) => {
  return (
    <th>
      {props.name}
      <IconButton 
        className="classic-button" 
        id={props.id} 
        onClick={(event) => props.handleChange(event.currentTarget.id)}
      >
        {props.sortedCol !== props.id ? <SortIcon fontSize="small" /> :
          props.order === 'asc' ? <ArrowDownwardIcon fontSize="small" /> :
            <ArrowUpwardIcon fontSize="small" />
        }
      </IconButton>
    </th>
  )
}