import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import PetsIcon from '@mui/icons-material/Pets';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/user';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store/store';

const AdminMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.user);

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
    <Tooltip title="Открыть меню">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 40, height: 40 }} src="/broken-image.jpg"/>
      </IconButton>
    </Tooltip>
  </Box>
  <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 20,
          height: 20,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <MenuItem>
      <Link to={`/profile/${user}/dashboard`} style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar /> Панель администратора
      </Link>
    </MenuItem>
    <Divider />
    <MenuItem>
    <Link to={`/profile/${user}/add-pet`}>
      <ListItemIcon>
        <PetsIcon fontSize="small" />
      </ListItemIcon>
      Добавить питомца
    </Link>
    </MenuItem>
    <MenuItem>
    <Link to={`/profile/${user}`}>
      <ListItemIcon>
        <Settings fontSize="small" />
      </ListItemIcon>
      Настройки профиля
    </Link>
    </MenuItem>
    <MenuItem onClick={() => dispatch(logout())}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Выйти
    </MenuItem>
  </Menu>
  </>
  );
}

export default AdminMenu;
