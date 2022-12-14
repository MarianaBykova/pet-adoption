import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import FormLogin from "../Form/LoginForm";
import AdminMenu from "../AdminProfile/Menu";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import './header.scss';

const Header: React.FC = () => {

  const [showLoginForm, setShowLoginForm] = useState(false)
  const {isAuth} = useSelector((state: RootState) => state.user)

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to='/'><img src='/img/logo.svg' alt='logo'/></Link>
        <div className='header__logo-text'>
          <span>Добрый</span>
          <span>дом</span>
        </div>
      </div>
      <nav className='header__nav'>
        <ul>
          <li><Link to='/about-us'>О нас</Link></li>
          <li><Link to='/at-home'>Уже дома</Link></li>
        </ul>
      </nav>
      {isAuth 
        ? <AdminMenu/>
        : 
        (<Tooltip title="Вход только для администратора">
          <Button variant="outlined" onClick={() => setShowLoginForm(!showLoginForm)}>Войти</Button>
        </Tooltip>)
      }
      {showLoginForm && !isAuth &&<FormLogin setShowLoginForm ={setShowLoginForm}/>}
    </header>
  );
}
 
export default Header;
