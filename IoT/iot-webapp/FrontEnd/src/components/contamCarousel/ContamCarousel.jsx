import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Card, Button, Icon } from 'semantic-ui-react';
import './contamCarousel.scss';
import { Carousel } from 'react-bootstrap';
// import './contaminationCard.css'
import { FiAlertTriangle } from "react-icons/fi";
import { projectStorage, projectFirestore } from '../../config/firebase-config';
import { db_time_parser } from '../../utils/dateHelper';
export const ContamCarousel = ({ rackName, openModal}) => {
  const [index, setIndex] = useState(0);
  const [contamImgs, setContamImgs] = useState(null);



  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const renderCarousel = () =>{
    if (contamImgs){
      if (contamImgs.length !==0){
        const carouselArr = contamImgs.map((doc)=>(
              
          <Carousel.Item key={doc.id}>
            <img 
            className="d-block w-100" 
            style={{width:"100px"}} 
            src={doc.url} />
            <h5>{rackName}</h5>
            <h6>Image Date: {db_time_parser(new Date(doc.createdAt.seconds*1000))}</h6>
          </Carousel.Item>
          
          )                
      )
      return carouselArr


      }
      else {
        return (
          <Carousel.Item>
            <img 
            className="d-block w-100" 
            style={{width:"100px"}} 
            src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <h5 title="Header" data-testid="header"  >No Images yet</h5>
            <Card.Meta>Null</Card.Meta>
        </Carousel.Item>
        )
      }
    }
    else {
      return (<Icon loading name='spinner'/>)
    }
  }

  useEffect(() => {
    const unsub = projectFirestore.collection(rackName).doc('26-06-2022').collection('contam')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot)=> {
      let documents = []
      snapshot.forEach( doc => {
          // want to store data + id in the array
          documents.push({...doc.data(), id: doc.id})
      })
      console.log(documents)
      setContamImgs(documents)
  })
    // clean up 
    return ()=> unsub()

    }, []);

    // console.log(files)


  return (
    // <Card color={cardClass(folderRetrieved)}>
    <Card color='red'>
    
      <Card.Content>
      
      <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        {/* {contamImgs ? 
        contamImgs.map((doc)=>(
              
              <Carousel.Item key={doc.id}>
                <img 
                className="d-block w-100" 
                style={{width:"100px"}} 
                src={doc.url} />
                <h3 title="Header" data-testid="header"  >{rackName}</h3>
                <Card.Meta>{doc.createdAt.toString()}</Card.Meta>
              </Carousel.Item>
            
            )                
        ): <Icon loading name='spinner'/>
        } */}
        {renderCarousel()}


      </Carousel>

      
      <div className="pt-3" align="center">
        <Button data-testid="button" onClick={openModal}><Icon name="magnify"/>Check</Button> 
      </div>
      
      </Card.Content>
    </Card>

  )
}