import React, {useState} from 'react'
import './infoModal.scss'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
export const InfoModal = ({id, trigger}) => {
  const [open, setOpen] = useState(false);


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid black',
  boxShadow: 24,
  p: 4,
  display: 'block'
};



  // modal controls
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <a className="modalOpen" onClick={handleOpen}>{id}</a>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          
            <h4>Cycle Information</h4>
            
                
            
            
        
   
        </Box>
      </Modal> 
      </div>
  )
}
