import React, {useEffect, useState} from 'react'
import './singleImageModal.scss'
import { Button, Segment, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'

export const SingleImageModal = ({isOpen, singleImg}) => {
    // const [open, setOpen] = useState(false);
  return (
    <Modal
    className='modalclass'
    // onClose={() => setOpen(false)}
    // onOpen={() => setOpen(true)}
    open={isOpen}
    size="small"
//     trigger={
//    <h4><Link to="#">View Images <Icon name="magnify" size='large'/></Link></h4>
   
//     }
  
  >
    
    <Modal.Content image>
        <Image size='medium' src={singleImg} wrapped />
        
    </Modal.Content>

  </Modal>
    
  )
}
