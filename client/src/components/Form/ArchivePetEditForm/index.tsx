import TextField from '@mui/material/TextField';

import Button from '../../Button';

import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { authUrl } from '../../../utils/axios';

import './archive-pet-edit-form.scss';
import { useDispatch } from 'react-redux';
import { setRefetchArchive } from '../../../store/slices/refetch';

type TArchivePetEditFormProps = {
  text: string | null;
  history: string | null;
  petId: number
  onCloseForm: () => void;
}

const ArchivePetEditForm: React.FC<TArchivePetEditFormProps> = ({ text, history, petId, onCloseForm }) => {

  const dispatch = useDispatch();
  return (
    <Formik
        initialValues={{ text: text, history: history }}
          onSubmit={(values, { setSubmitting }) => {
            authUrl.post('/pet/archive/'+petId, values)
              .then((res) => toast.success(res.data.message))
              .then(() => dispatch(setRefetchArchive(true)))
            onCloseForm()  
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className='archive-pet-edit__form'>
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
