import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './imageModal.scss'
import { Button, Segment, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
// import { SingleImageModal } from '../singleImageModal/SingleImageModal'
export const ImageModal = ({title, imgArr}) => {
  console.log(imgArr)  
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false)
  
  const handleDetailOpen = () => setDetailOpen(true);
  const handleDetailClose= () => setDetailOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  return (
    
    <Modal
    className='modalclass'
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    size="fullscreen"
    trigger={
   <h4><Link to="#">View Images <Icon name="magnify" size='large'/></Link></h4>
   
  }
  
  > 
  <Modal.Header>
    <h4><Icon name="camera" color='blue'/> {title}</h4>
  </Modal.Header>
  <Modal.Content scrolling>
  <Card.Group itemsPerRow={4} stackable={true} doubling={true}>
    {imgArr&&
      imgArr.map((Img)=>{
        return(
          
            <Card className='fluid'>
              
                
                <Image src={Img} wrapped ui={false} onClick={handleDetailOpen} size="medium"/>
                
              
              {/* <SingleImageModal isOpen={detailOpen} singleImg={Img}/> */}
          </Card>
          

              
        
        )
      }) 
    }
    
   </Card.Group>
  </Modal.Content>


  </Modal>
  )
}
