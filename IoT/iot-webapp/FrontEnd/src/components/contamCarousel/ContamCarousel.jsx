import React, {useState} from 'react';
import { Card, Button } from 'semantic-ui-react';
import './contamCarousel.scss';
import { Carousel } from 'react-bootstrap';
import { RiTempHotLine } from "react-icons/ri";
import Grid from '@mui/material/Grid';
import './contaminationCard.css'
import { FiAlertTriangle } from "react-icons/fi";

import c1 from '../../static/c1.jpg';
import c2 from '../../static/c2.jpg';
import c3 from '../../static/c3.jpg';

export const ContamCarousel = ({ images, header, meta, openModal}) => {
  const [index, setIndex] = useState(0);

  // file names can be 
  // contam
  // noncontam
  // observation
  const folderRetrieved = "contam"

  const cardClass = (folderRetrieved) => {
    if (folderRetrieved == "contam"){
      return "card bg-danger"
    }
    else if (folderRetrieved == "noncontam"){
      return "card bg-success"
    }
  }
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  return (
    <Card className={cardClass(folderRetrieved)}>
      
      <Card.Content>
      {folderRetrieved == "contam" ? <FiAlertTriangle/> : null}
      <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        <Carousel.Item>
        
          <img
            className="d-block w-100 "
            src={c1}
            alt="First slide"
          />
          <h3>{header}</h3>
          <Card.Meta>{meta}</Card.Meta>
        </Carousel.Item>
        
        <Carousel.Item>
          <img
            className="d-block w-100 h-75"
            src={c2}
            alt="Second slide"
          />
          <h3>{header}</h3>
          <Card.Meta>{meta}</Card.Meta>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c3}
            alt="Third slide"
          />
          <h3>{header}</h3>
          <Card.Meta>{meta}</Card.Meta>
        </Carousel.Item>
      
      </Carousel>

      
      <div align="center">
        <Button basic inverted onClick={openModal}>More Details</Button> 
      </div>
      
      </Card.Content>
    </Card>

  )
}