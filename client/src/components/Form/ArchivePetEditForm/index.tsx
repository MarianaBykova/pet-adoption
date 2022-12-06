import TextField from '@mui/material/TextField';

import { Formik, Form, FormikErrors, ErrorMessage } from 'formik';
import { authUrl } from '../../../utils/axios';
import Button from '../../Button';

type TArchivePetEditFormProps = {
  text: string | null;
  history: string | null;
  petId: number
  onCloseForm: () => void;
}

const ArchivePetEditForm: React.FC<TArchivePetEditFormProps> = ({ text, history, petId, onCloseForm }) => {
  return (
    <Formik
        initialValues={{ text: text, history: history }}
          onSubmit={(values, { setSubmitting }) => {
            authUrl.post('/pet/archive/'+petId, values)
              .then((res) => console.log(res.data.message))
            // authUrl.post('/profile/edit', values)
            //   .then((res) => {
            //     dispatch(setAdmin(res.data.user))
            //   })
            onCloseForm()  
            // navigate('/profile/1')
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <TextField
                label="Краткий заголовок истории"
                name='text'
                size="small"
                onChange={handleChange}
                value={values.text}
              />
              <TextField
                label="История"
                name='history'
                multiline
                maxRows={8}
                onChange={handleChange}
                value={values.history}                
              />
              <Button type="submit">Подтвердить</Button>
            </Form>
          )}
        </Formik>
  );
}
 
export default ArchivePetEditForm;
