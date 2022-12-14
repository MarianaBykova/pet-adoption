import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { pink } from '@mui/material/colors';

import Button from '../../Button';

import './profile-info.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const ProfileInfo: React.FC = () => {
  const {userData} = useSelector((state: RootState) => state.user);

  return (
    <main className='profile-info'>
      <h2>Страница пользователя</h2>
      <div className='profile-info__content'>
      <Avatar sx={{ bgcolor: pink[300], width: 120, height: 120, fontSize: '3.25rem' }}>A</Avatar>
      <Paper className='profile-info__card' elevation={3}>
        <p>Имя пользователя: {userData.userName}</p>
        <p>Почта: {userData.email}</p>
        <p>Роль: администратор</p> 
        <Link to='/profile/1/edit' className='profile-info__button'><Button style={{display: 'block', margin:'auto'}}>Изменить данные</Button></Link>
      </Paper>
      </div>
     
    </main>
  );
}
 
export default ProfileInfo;
