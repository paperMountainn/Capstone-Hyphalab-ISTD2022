import React, {useEffect, useState} from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import './contamCarousel.scss';
import { Carousel } from 'react-bootstrap';
import './contaminationCard.css'
import { FiAlertTriangle } from "react-icons/fi";
import { projectStorage } from '../../config/firebase-config';

export const ContamCarousel = ({ header, meta, openModal}) => {
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState();
  const [info, setInfo] = useState();

  // file names can be 
  // contam
  // noncontam
  // observation
  const folderRetrieved = "contam"

  const cardClass = (folderRetrieved) => {
    if (folderRetrieved == "contam"){
      return "red"
    }
    else if (folderRetrieved == "noncontam"){
      return "green"
    }
  }
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchImages = async () => {

        let result = await projectStorage.ref('/data/rack1/contaminationCheck/contam').listAll();
        // let metadata = await projectStorage.ref('data').getMetadata();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
        return Promise.all(urlPromises);
    }
    
    const loadImages = async () => {
        const urls = await fetchImages();
        urls.forEach(function(item, index){
          // console.log(item, index)
        });
        console.log(urls[1])
        setFiles(urls);
    }
    loadImages();
    
    }, []);

    console.log(files)

  return (
    
    <Card color={cardClass(folderRetrieved)}>
      
    
      <Card.Content>
      {folderRetrieved == "contam" ? <FiAlertTriangle/> : null}
      <Carousel 
      fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false} nextLabel={null} nextIcon={null}
        >
        {files ? 
        files.map((url)=>(
              
              <Carousel.Item>
                <img 
                className="d-block w-100" 
                key={url} 
                style={{width:"100px"}} 
                src={url} />
                <h3 title="Header" data-testid="header" class={cardClass(folderRetrieved)} >{header}</h3>
                <Card.Meta>{meta}</Card.Meta>
              </Carousel.Item>
            
            )                
        ):<Icon loading name='spinner'/>
        }

        {/* <Carousel.Item>
        
          <img
            className="d-block w-100 "
            src={c1}
            alt="First slide"
          />
          <h3 class={cardClass(folderRetrieved)} >{header}</h3>
          <Card.Meta>{meta}</Card.Meta>
        </Carousel.Item>
        
        <Carousel.Item>
          <img
            className="d-block w-100 h-75"
            src={c2}
            alt="Second slide"
          />
          <h3 class={cardClass(folderRetrieved)} >{header}</h3>
          <Card.Meta>{meta}</Card.Meta>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c3}
            alt="Third slide"
          />
          <h3 class={cardClass(folderRetrieved)} >{header}</h3>
          <Card.Meta>{meta}</Card.Meta>
        </Carousel.Item> */}
      
      </Carousel>

      
      <div className="pt-3" align="center">
        <Button data-testid="button" onClick={openModal}>More Details</Button> 
      </div>
      </Card.Content>
    </Card>
  

  )
}