import { TableCell, TableRow } from '@mui/material';
import { Menu, MenuItem, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import PetEditModal from '../../PetEditModal';

import { authUrl } from '../../../../utils/axios';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRefetch } from '../../../../store/slices/refetch';

type TPetListRowProps = {
  row: any;
}

const PetListRows: React.FC<TPetListRowProps> = ({ row }) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    authUrl.delete('/pet/'+row.id)
    dispatch(setRefetch(true));
    setAnchorEl(null);
  };

  const handleSendToArchive = () => {
    authUrl.delete('/pet/archive/'+row.id);
    dispatch(setRefetch(true));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          <Link to={`/pet/${row.id}`}>{row.name}</Link>
        </TableCell>
        <TableCell align="left">{row.age}</TableCell>
        <TableCell align="left">{row.sex}</TableCell>
        <TableCell align="left">{row.color}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete" onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
          <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleDelete}>Удалить питомца</MenuItem>
          <MenuItem onClick={handleSendToArchive}>Отправить в архив</MenuItem>
        </Menu>
          <Tooltip title="Редактировать питомца" placement="top-end">
            <IconButton aria-label="expand row" color="primary" onClick={() => setShowEditModal(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      {showEditModal && <PetEditModal open={showEditModal} petId={row.id} onClose={() => setShowEditModal(false)}/>}
    </>
  );
}
 
export default PetListRows;
