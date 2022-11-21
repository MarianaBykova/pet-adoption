import { Checkbox as CheckboxMui, FormControlLabel } from '@mui/material';

import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setFilters } from '../../store/slices/filter';
import { resetPage, resetPets } from '../../store/slices/pets';

type TCheckboxProps = {
  label: React.ReactNode;
  value: string | boolean | number;
  name: string;
}

const Checkbox: React.FC<TCheckboxProps> = ({label, value, name, ...rest}) => {

  const {filters} = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch();

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({[event.target.name]: event.target.value}))
    dispatch(resetPets());
    dispatch(resetPage())
  }, []);

  return (
    <FormControlLabel control = {
      <CheckboxMui
        checked={filters.find(el => Object.values(el)[0] === value) ? true : false}
        onChange={handleChange}
        // inputProps={{ 'aria-label': 'controlled' }}
        inputProps={{ name: name }}
        value = {value}
        {...rest}
      />
    } label= {label}/>
  );
}
 
export default React.memo(Checkbox);
