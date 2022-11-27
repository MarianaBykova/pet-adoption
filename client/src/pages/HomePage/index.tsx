import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './home-page.scss';

const HomePage = () => {
  return (
    <div className='home-page'>
      <div className='home-page__text'>
        <p>Собаки и кошки нашего приюта ждут тебя!</p>
        <Link to='/find-pet'><Button>Выбери друга</Button></Link>
      </div>
      <img src='/img/main-pic.png' alt='cat and dog'/>
    </div>
  );
}
 
export default HomePage;
