import { Checkbox as CheckboxMui, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../store/slices/filter';

type TCheckboxProps = {
  label: React.ReactNode;
  value: string | boolean | number;
}

const Checkbox: React.FC<TCheckboxProps> = ({label, value}) => {

  const dispatch = useDispatch();

  // const [checked, setChecked] = useState(false);

  // console.log(checked, 'checked')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setChecked(event.target.checked);
    let e = event.target
    let name = e.name
    dispatch(setFilters(e.value))
    console.log(e.value, e)
  };

  return (
    <FormControlLabel control = {
      <CheckboxMui
        // checked={checked}
        onChange={handleChange}
        // inputProps={{ 'aria-label': 'controlled' }}
        value = {value}
      />
    } label= {label}/>
  );
}
 
export default Checkbox;
