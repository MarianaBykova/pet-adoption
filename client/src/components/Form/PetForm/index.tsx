import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';

import Button from '../../Button';
import RadioGroup from '../../Radio';

import { Formik, Form, FieldArray } from 'formik';
import { authUrl } from '../../../utils/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import './pet-form.scss'

const petTypes = [{id: 'cat', title: 'кошка'}, {id: 'dog', title: 'собака'}];
const genderTypes = [{id: 'М', title: 'М'}, {id: 'Ж', title: 'Ж'}];
const coatTypes = [{id:'длинная', title: 'длинная'}, {id:'короткая', title: 'короткая'}]

const PetForm = () => {
  const {colors} = useSelector((state: RootState) => state.colors)
  return (
    <main className='add-pet'>
      <Paper elevation={3} className='add-pet'>
        <h2>Добавление питомца</h2>
        <Formik
        initialValues={{name: '', type: 'cat', sex: '', age: 0, coat: '', color: '', activity: 0, friendliness: false, image:[], description: ''}}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log('pet values', values)
            authUrl.post('/pet/create', values).then((res) => console.log(res))
            resetForm();
          }}
        >
          {({ isSubmitting, handleChange, values, setFieldValue, handleBlur }) => (
            <Form className='add-pet__form'>
              <TextField
                required
                label="Имя питомца"
                name='name'
                size="small"
                onChange={handleChange}
                value={values.name}
              />
              <RadioGroup label='Вид питомца:' name='type' value={values.type} onChange={handleChange} items={petTypes}/>
              <RadioGroup label='Пол:' name='sex' value={values.sex} onChange={handleChange} items={genderTypes}/>
              <Typography gutterBottom>Возраст питомца:</Typography>
              <Slider
                name='age'
                aria-label="Small steps"
                defaultValue={0}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={25}
                onChange={handleChange}
                value={values.age}
              />
              <RadioGroup label='Шерсть:' name='coat' value={values.coat} onChange={handleChange} items={coatTypes}/>
              <Autocomplete
                freeSolo
                autoSelect
                id="color"
                options={colors.map((option) => option)}
                onBlur={handleBlur}
                onChange={(e, value) => {
                  setFieldValue("color", value);
                }}
                renderInput={(params) => <TextField required {...params} name='color' label="Цвет шерсти" />}
              />
              <Typography component="legend">Активность:</Typography>
              <Rating name="activity" value={Number(values.activity)} onChange={handleChange}/>
              <FormGroup>
                <FormControlLabel control={<Switch name='friendliness' value={values.friendliness} onChange={handleChange}/>} label="Дружелюбность" />
              </FormGroup>
              <FieldArray
                name='image'
                render={arrayHelpers => (
                  <div>
                    {values.image && values.image.length > 0 ? (
                      values.image.map((image, index) => (
                        <div key={index}>
                          <TextField name={`image.${index}`} value={image} onChange={handleChange}/>
                          <IconButton color="primary">
                            <RemoveCircleIcon onClick={() => arrayHelpers.remove(index)}/>
                          </IconButton>
                          <IconButton color="primary">
                            <AddCircleIcon onClick={() => arrayHelpers.insert(index, '')}/>
                          </IconButton>
                        </div>
                      ))
                    ) : (
                      <Button variant='outlined' onClick={() => arrayHelpers.push('')}>Добавить изображения</Button>
                    )}
                  </div>
                )}
              />
              <TextField
                required
                label="Описание"
                name='description'
                multiline
                maxRows={4}
                onChange={handleChange}
                value={values.description}                
              />
              <Button type="submit">Подтвердить</Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </main>
  );
}
 
export default PetForm;
