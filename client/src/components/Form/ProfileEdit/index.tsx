import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import Button from '../../Button';

import { Formik, Form, FormikErrors, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { authUrl } from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setAdmin } from '../../../store/slices/user';

import './profile-edit.scss';

interface FormValues {
  email: string;
}

const ProfileEdit: React.FC = () => {
  const {userData} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <main className='profile-edit'>
      <Paper elevation={3} className='profile-edit__content'>
        <h2>Редактирование профиля</h2>
        <Formik
        initialValues={{ email: userData.email, password: '', userName: userData.userName }}
          validate={(values: FormValues) => {
            let errors: FormikErrors<FormValues> = {};
            if (values.email &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Некорректный формат почты';
            }
            return errors;
          }}
          
          onSubmit={(values, { setSubmitting }) => {
            authUrl.post('/profile/edit', values)
              .then((res) => {
                dispatch(setAdmin(res.data.user));
                toast.success(res.data.message)
              }).catch(error => toast.error(error.message))
            setSubmitting(false);
            navigate('/profile/1')
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className='profile-edit__content-form'>
              <TextField
                required
                label="Имя пользователя"
                name='userName'
                size="small"
                onChange={handleChange}
                value={values.userName}
              />
              <TextField
                required
                name="email"
                label="Почта"
                size="small"
                onChange={handleChange}
                value={values.email}
              />
              <ErrorMessage name="email" component="div" className='form__error'/>
              <TextField
                label="Пароль"
                name='password'
                type="password"
                size="small"
                onChange={handleChange}
                value={values.password}
              />
              <Button type="submit">Подтвердить</Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </main>
  );
}
 
export default ProfileEdit;
