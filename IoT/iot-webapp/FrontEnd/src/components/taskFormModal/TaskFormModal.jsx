import React from 'react'
import './taskFormModal.scss'
import Box from '@mui/material/Box';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
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
};


export const TaskFormModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (e) => {
    e.preventDefault()

    
  }


  return (
    <div>
      <Button onClick={handleOpen}>Assign New Task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
            <h4>Task Assignment Form</h4>
            <br />
          
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First Name' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' />
            </Form.Field>
            <Button type='submit' color="green" onClick={()=>{console.log(Form)}}>Submit</Button>
          </Form>
          {/* </Typography> */}
          <br />
          {/* <Button color='grey' onClick={() => setOpen(false)}>
            Cancel
        </Button> */}
        {/* <Button
          content="Confirm"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        /> */}
        </Box>
      </Modal>
    </div>
  )
}
