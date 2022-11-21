import FormGroup from '@mui/material/FormGroup';

import Checkbox from "../../components/Checkbox";
import Button from "../Button";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { resetFilters } from "../../store/slices/filter";
import { resetPage, resetPets } from "../../store/slices/pets";

const CheckboxList = () => {
  
  const dispatch = useDispatch();
  const {colors} = useSelector((state: RootState) => state.colors);

  const clearFilters = () => {
    dispatch(resetPets());
    dispatch(resetFilters())
    dispatch(resetPage());
  }

  return (
    <aside className='pets-page__filters'>
      <FormGroup>
        <Checkbox value = 'cat' name='type' label = 'кошки'/>
        <Checkbox value = 'dog' name='type' label = 'собаки'/>
      </FormGroup>  
      <h4>Цвет</h4>
      {colors?.map((el, index) => <Checkbox key={index} value = {el} name='color' label = {el}/>)}
      <h4>Характер</h4>
      <Checkbox value = 'true' name='friendliness' label = 'Ладит с другими питомцами'/>
      <Checkbox  value = 'false' name='friendliness' label = 'Предпочитает быть наедине с хозяином'/>
      <Checkbox value = '2' name='activity' label = 'Активный'/>
      <Checkbox  value = '3' name='activityLow' label = 'Спокойный'/>
      <Button onClick={clearFilters} title={'Очистить фильтры'} variant='outlined'/>
    </aside>
  );
}
 
export default CheckboxList;
