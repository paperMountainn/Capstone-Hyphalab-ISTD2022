import React from 'react'
import './contamFormModal.scss'
import { Button, Checkbox, Form, Card, Modal, Grid, Image, Header } from 'semantic-ui-react'
import './contamFormModal.css';

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

export const ContamFormModal = ({modalState, closeModal}) => {
  const [close, setClose] = React.useState(modalState);

  const handleSubmit = async (e) => {
    e.preventDefault()

    
  }


  return (
    <div>
      {/* <Button onClick={handleOpen}>Select Racks to be Checked</Button> */}
      <Modal
        as={Form}
        open={modalState}
        onClose={()=>closeModal(false)}
      >
      <Modal.Header>Select Racks and action to take</Modal.Header>
      <i class="close icon" onClick={()=>closeModal(false)} ></i>
      <Modal.Content image scrolling >
        <Modal.Description>
          <Form.Input label="Name" required type="text" placeholder="Your name" />
          <Form.Group grouped>
            <label>Select the racks:</label>
            <Form.Field label='Tray 1' control='input' type='checkbox' />
            <Form.Field label='Tray 2' control='input' type='checkbox' />
            <Form.Field label='Tray 3' control='input' type='checkbox' />
            <Form.Field label='Tray 4' control='input' type='checkbox' />
            <Form.Field label='Tray 5' control='input' type='checkbox' />
            <Form.Field label='Tray 6' control='input' type='checkbox' />
            <Form.Field label='Tray 7' control='input' type='checkbox' />
            <Form.Field label='Tray 8' control='input' type='checkbox' />
            <Form.Field label='Tray 9' control='input' type='checkbox' />
            <Form.Field label='Tray 10' control='input' type='checkbox' />
          </Form.Group>
          
          <Form.Input label="Assign" type="text" placeholder="Assign operator" />
          <br />
          <Modal.Actions>
          <label>Select action:</label>
            <Button type='False Alarm' onClick={()=>{console.log(Form)}}>False Alarm</Button>
            <Button type='Are Contaminated' onClick={()=>{console.log(Form)}}>Are Contaminated</Button>
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
