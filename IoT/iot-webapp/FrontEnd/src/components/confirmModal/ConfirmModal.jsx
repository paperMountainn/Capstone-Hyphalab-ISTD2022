import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export const ConfirmModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
    <div className='completeButton' onClick={handleShow}>Complete</div>
   
    <Modal
    size='sm' show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Complete</Modal.Title>
      </Modal.Header>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleClose}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
