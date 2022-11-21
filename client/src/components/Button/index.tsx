import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

type ButtonProps = MuiButtonProps & {
  title: string;
  // variant?: 'contained' | 'outlined' | 'text';
  // size?: 	'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({title, variant, size, onClick, ...rest}) => {
  return (
    <MuiButton 
      variant = {variant || "contained"}
      size = {size || 'medium'}
      onClick = {onClick}
      {...rest}
    >
    {title}
    </MuiButton>
  );
}
 
export default Button;
