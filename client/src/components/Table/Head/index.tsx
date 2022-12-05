import { TableHead as MuiTableHead, TableCell, TableRow, TableSortLabel, Box} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface IHeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export type TOrder = 'asc' | 'desc';

interface ITableHeadProps<T> {
  headCells: Array<IHeadCell<T>>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: TOrder;
  orderBy: string;
  // rowCount: number;
}

function TableHead<T>(props: ITableHeadProps<T>) {
  const { headCells, order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <MuiTableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            // align={headCell.numeric ? 'right' : 'left'}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell/>
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
