import Radio from '@mui/material/Radio';
import { RadioGroup as MuiRadioGroup } from '@mui/material';
import { RadioGroupProps as MuiRadioGroupProps } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type TRadioGroupProps = MuiRadioGroupProps & {
  label: string,
  items: Array<{ id: string, title: string }>
}

const RadioGroup: React.FC<TRadioGroupProps> = ({label, name, value, onChange, items}) => {
  return (
    <FormControl required>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {
          items.map(el => <FormControlLabel key={el.id} value={el.id} control={<Radio required/>} label={el.title} />)
        }
      </MuiRadioGroup>
    </FormControl>
  );
}
 
export default RadioGroup;
