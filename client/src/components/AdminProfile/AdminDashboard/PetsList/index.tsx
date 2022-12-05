import TablePagination from '@mui/material/TablePagination';

import Table from "../../../Table";
import TableHead from "../../../Table/Head";
import TableBody from "../../../Table/Body";
import PetListRows from '../PetListRows';
import useTableSort from '../../../../hooks/useTableSort';

import { TPetType } from "../../../../types/types";
import { authUrl } from '../../../../utils/axios';

import { useState, useEffect } from 'react';

interface IHeadCell {
  disablePadding: boolean;
  id: keyof TPetType;
  label: string;
  numeric: boolean;
}

const headCells: IHeadCell[] = [
  {
    disablePadding: false,
    id: 'name',
    label: 'Имя питомца',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'age',
    label: 'Возраст',
    numeric: true,
  },
  {
    disablePadding: false,
    id: 'sex',
    label: 'Пол',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'color',
    label: 'Цвет',
    numeric: false,
  }
]

const PetsList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const { sortedItems, order, orderBy, handleRequestSort } = useTableSort(rows);

  useEffect(() => {
    authUrl.get('/pet/all')
      .then((res) => setRows(res.data))
  }, [])

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Table title='Список питомцев'>
        <TableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort}/>
        <TableBody>
          {sortedItems
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
            <PetListRows key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
 
export default PetsList;
