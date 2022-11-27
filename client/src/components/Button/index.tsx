import { Button as MuiButton, ButtonProps } from '@mui/material';

const Button: React.FC<ButtonProps> = ({variant, size, onClick, children, ...rest}) => {
  return (
    <MuiButton 
      variant = {variant || "contained"}
      size = {size || 'medium'}
      onClick = {onClick}
      {...rest}
    >
    {children}
    </MuiButton>
  );
}
 
export default Button;
