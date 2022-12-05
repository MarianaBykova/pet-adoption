import { Modal as MuiModal, Box, Typography, ModalProps as MuiModalProps } from '@mui/material';

type TModalProps = MuiModalProps & {
  title: string,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modal: React.FC<TModalProps> = ({ open, onClose, title, children}) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </MuiModal>
  );
}

export default Modal;
