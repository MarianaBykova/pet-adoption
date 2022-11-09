import { Button as MuiButton } from '@mui/material';

type ButtonProps = {
  title: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 	'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({title, variant, size}) => {
  return (
    <MuiButton 
      variant = {variant || "contained"}
      size = {size || 'medium'}
    >
    {title}
    </MuiButton>
  );
}
 
export default Button;
