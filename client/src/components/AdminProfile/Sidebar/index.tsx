import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PetsIcon from '@mui/icons-material/Pets';

import { NavLink } from "react-router-dom";

import './sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <MenuList className='sidebar'>
      <MenuItem component={NavLink} className='sidebar__item' to={`/profile/1/dashboard`}>
      <AdminPanelSettingsIcon />
        Панель администратора
      </MenuItem>
      <MenuItem component={NavLink} className='sidebar__item' to={`/profile/1/add-pet`}>
        <PetsIcon/>
        Добавить питомца
      </MenuItem>
      <MenuItem component={NavLink} className='sidebar__item' to={`/profile/1`} end>
        <SettingsIcon />
          Редактировать профиль
      </MenuItem>
    </MenuList>
  );
}
 
export default Sidebar;
