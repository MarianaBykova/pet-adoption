import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import FormLogin from "../Form";
import AdminMenu from "../AdminProfile/Menu";


import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import './header.scss';

const Header = () => {

  const [showLoginForm, setShowLoginForm] = useState(false)
  const {isAuth} = useSelector((state: RootState) => state.user)

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'><img src='/img/logo.svg' alt='logo'/></Link>
        <span>Добрый дом</span>
      </div>
      <nav>
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
      {/* <div>
      <Tooltip title="Вход только для администратора">
        <Avatar aria-haspopup="true" src="/broken-image.jpg" onClick={() => setShowLoginForm(!showLoginForm)}/>
      </Tooltip>
      {showLoginForm && isAuth && <AdminMenu setShowLoginForm ={setShowLoginForm} show={showLoginForm}/>}
      {showLoginForm && !isAuth &&<FormLogin setShowLoginForm ={setShowLoginForm}/>}
      </div> */}
    </header>
  );
}
 
export default Header;
