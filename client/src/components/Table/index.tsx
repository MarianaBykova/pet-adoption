import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import TableContainer from '@mui/material/TableContainer';
import { Table as MuiTable, TableProps } from '@mui/material'

const Table: React.FC<TableProps> = ({ title, children }) => {
  return (
    <>
    <Toolbar>
      <Typography variant='h4' sx={{ flex: '1 1 100%' }}>{title}</Typography>
    </Toolbar>
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        {children}
      </MuiTable>
    </TableContainer>
    </>
  );
}
 
export default Table;
