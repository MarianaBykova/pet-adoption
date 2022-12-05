import { TableBody as MuiTableBody, TableBodyProps as MuiTableBodyProps } from '@mui/material';

const TableBody:React.FC<MuiTableBodyProps> = ({ children }) => {
  return (
    <MuiTableBody>
      {children}
      {/* {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )} */}
    </MuiTableBody>
  );
}
 
export default TableBody;
