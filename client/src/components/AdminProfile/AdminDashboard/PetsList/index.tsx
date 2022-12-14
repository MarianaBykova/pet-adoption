import TablePagination from '@mui/material/TablePagination';

import Table from "../../../Table";
import TableHead from "../../../Table/Head";
import TableBody from "../../../Table/Body";
import PetListRows from '../PetListRows';
import Spinner from '../../../Spinner';
import useTableSort from '../../../../hooks/useTableSort';

import { TPetType } from "../../../../types/types";
import { authUrl } from '../../../../utils/axios';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { setRefetch } from '../../../../store/slices/refetch';

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
  const [isLoading, setLoading] = useState(false);

  const { sortedItems, order, orderBy, handleRequestSort } = useTableSort(rows);

  const { needRefetch } = useSelector((state: RootState) => state.refetch);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    authUrl.get('/pet/all')
      .then((res) => setRows(res.data))
      .then(() => dispatch(setRefetch(false)))
      .then(() => setLoading(false))
  }, [needRefetch])

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
        {isLoading 
          ? <div style={{display: 'table-row', width: '100%'}}><Spinner /></div>
          : <TableBody>
              {sortedItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                <PetListRows key={row.id} row={row} />
              ))}
            </TableBody>
        }
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Питомцев на странице'
      />
    </>
  );
}
 
export default PetsList;
