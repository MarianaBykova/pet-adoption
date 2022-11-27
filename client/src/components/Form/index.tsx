import TextField from '@mui/material/TextField';
import { Formik, Form, FormikErrors, ErrorMessage } from 'formik';
import Button from '../Button';

import { Dispatch, SetStateAction } from 'react';
import { fetchUser } from '../../store/slices/user';
import { useAppDispatch } from '../../store/store';

import './form-login.scss'

interface FormValues {
  email: string;
}

type TShowLogin = {
  setShowLoginForm: Dispatch<SetStateAction<boolean>>;
}
 
const FormLogin: React.FC<TShowLogin> = ({setShowLoginForm}) => {
  const dispatch = useAppDispatch();
  return (
  <Formik
   initialValues={{ email: '', password: '' }}
    validate={(values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.email) {
        errors.email = 'Обязательно для заполнения';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Некорректный формат почты';
      }
      return errors;
    }}
    
    onSubmit={(values, { setSubmitting }) => {
      dispatch(fetchUser(values))
      setSubmitting(false);
      setShowLoginForm(false)
    }}
  >
    {({ isSubmitting, handleChange, values }) => (
      <Form className='form__login'>
        <TextField
          required
          id="outlined-required"
          name="email"
          label="Email"
          size="small"
          onChange={handleChange}
          value={values.email}
        />
        <ErrorMessage name="email" component="div" className='form__error'/>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          name='password'
          type="password"
          size="small"
          onChange={handleChange}
          value={values.password}
        />
        <Button type="submit">Подтвердить</Button>
      </Form>
    )}
  </Formik>)
};

export default FormLogin;
