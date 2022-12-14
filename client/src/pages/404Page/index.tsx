import Button from "../../components/Button";

import { Link } from "react-router-dom";

import './404-page.scss';

const Page404: React.FC = () => {
  return (
    <main className='page-404'>
      <div className='page-404__content'>
        <h2>Ошибка 404 😕</h2>
        <p className="page-404__text">Кажется что-то пошло не так! Страница, которую Вы запрашиваете, не существует.
          Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке.
        </p>
        <Button>
          <Link to='/'>На главную</Link>
        </Button>
      </div>
    </main>
  );
}
 
export default Page404;
