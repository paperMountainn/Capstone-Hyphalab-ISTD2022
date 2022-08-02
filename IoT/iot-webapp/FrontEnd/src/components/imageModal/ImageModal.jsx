import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './imageModal.scss'
import { Button, Segment, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'

export const ImageModal = ({title, imgArr}) => {
  console.log(imgArr)  
  const [open, setOpen] = useState(false);

  return (
    
    <Modal
    className='modalclass'
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={
   <Link to="#">View Images <Icon name="magnify"/></Link>
   
  }
  
  > 
  <Modal.Header>
    <h4>{title}</h4>
  </Modal.Header>
  <Modal.Content scrolling>
  <Card.Group itemsPerRow={4}>
    {imgArr&&
      imgArr.map((Img)=>{
        return(
          
            <Card>
              <Image src={Img} wrapped ui={false}/>
          </Card>
        
        )
      }) 
    }
    
   </Card.Group>
  </Modal.Content>


  </Modal>
  )
}
