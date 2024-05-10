import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { Fade } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

type UseModalProps = {
  children?: React.ReactElement
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  openModalText?: string
}

function UseModal({ children, open, handleOpen, handleClose, openModalText }: UseModalProps) {
  return (
    <div>
      <Button variant='outlined' onClick={handleOpen}>{openModalText ?? 'Open modal'}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='modal-content'>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default UseModal