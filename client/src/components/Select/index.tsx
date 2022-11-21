import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetPets, resetPage } from '../../store/slices/pets';
import { SortContext, TSortContext } from '../../ui/AppLoader';


const options = [
  {title: 'По возрасту', value: 'age'}, 
  {title: 'По активности 🠕', value: 'activity'}, 
  {title: 'По активности 🠗', value: 'activityDESC'}
]

const SelectMui: React.FC = () => {

  const {sortType, setSortType} = useContext(SortContext) as TSortContext
  const dispatch = useDispatch()

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setSortType(event.target.value);
    dispatch(resetPets())
    dispatch(resetPage())
  }, []);

  return ( 
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Сортировать</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortType}
        label="Сортировать"
        onChange={handleChange}
      >
        {options.map((el) => <MenuItem key={el.title} value={el.value}>{el.title}</MenuItem>)}
      </Select>
    </FormControl>
  );
}
 
export default SelectMui;
