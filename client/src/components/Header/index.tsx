import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import './header.scss';

const Header = () => {
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
      <Tooltip title="Вход только для администратора">
        <Avatar src="/broken-image.jpg" />
      </Tooltip>
    </header>
  );
}
 
export default Header;
