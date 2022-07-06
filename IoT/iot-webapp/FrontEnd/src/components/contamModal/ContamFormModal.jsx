import React from 'react'
import './contamFormModal.scss'
import { Button, Checkbox, Form, Card, Modal, Grid, Image, Header } from 'semantic-ui-react'
import './contamFormModal.css';
import c1 from '../../static/c1.jpg';
import c2 from '../../static/c2.jpg';
import c3 from '../../static/c3.jpg';
import { RiFullscreenExitFill } from 'react-icons/ri';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid black',
//   boxShadow: 24,
//   p: 4,
// };

export const ContamFormModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (e) => {
    e.preventDefault()

    
  }


  return (
    <div>
      <Button onClick={handleOpen}>Select Racks to be Checked</Button>
      <Modal
        as={Form}
        open={open}
        onCloseButton ={handleClose}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
      <Modal.Header>Select Racks to be Checked</Modal.Header>
      <i class="close icon"></i>
      <Modal.Content Image><Modal.Description>
        <Form.Input label="Name" required type="text" placeholder="Your name" />
        <Form.Group grouped>
          <label>Select the racks:</label>
          <Form.Field label='Rack 1' control='input' type='checkbox' />
          <Form.Field label='Rack 2' control='input' type='checkbox' />
          <Form.Field label='Rack 3' control='input' type='checkbox' />
          <Form.Field label='Rack 4' control='input' type='checkbox' />
          <Form.Field label='Rack 5' control='input' type='checkbox' />
          <Form.Field label='Rack 6' control='input' type='checkbox' />
          <Form.Field label='Rack 7' control='input' type='checkbox' />
          <Form.Field label='Rack 8' control='input' type='checkbox' />
          <Form.Field label='Rack 9' control='input' type='checkbox' />
          <Form.Field label='Rack 10' control='input' type='checkbox' />
        </Form.Group>
      {/* <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped /> */}
      
      <br />

        <Form.Input label="Assign" type="text" placeholder="Assign operator" />
        <br />
        <Modal.Actions>
          <Button type='Are not Contaminated' color="green" onClick={()=>{console.log(Form)}}>False Alarm</Button>
          <Button type='Are Contaminated' color="green" onClick={()=>{console.log(Form)}}>Are Contaminated</Button>
        </Modal.Actions>
      </Modal.Description>
      </Modal.Content>
      </Modal>
      {/* <Modal as={Form}>
      <Header icon="pencil" content="This is my header" as="h2" />
      <Modal.Content>
        <Form.Input label="Name" required type="text" placeholder="Your name" /> */}
        {/* {saved ? <div>Saved!</div> : null} */}
      {/* </Modal.Content>
      <Modal.Actions>
        <Button type="submit" color="red" icon="times" content="Close" />
        <Button type="submit" color="green" icon="save" content="Save" />
        <Button type='submit' color="green" onClick={()=>{console.log(Form)}}>Submit</Button>
      </Modal.Actions>
    </Modal> */}


    </div>
  )
}
