import React, {useEffect, useState} from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import { Carousel } from 'react-bootstrap';
// import { FiAlertTriangle } from "react-icons/fi";
import { projectStorage } from '../../config/firebase-config';

import c1 from '../../static/c1.jpg';
import c2 from '../../static/c2.jpg';
import c3 from '../../static/c3.jpg';

export const ObservationCarousel = ({ header, meta, openModal}) => {
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState();
  const [info, setInfo] = useState();

  const folderRetrieved = "noncontam"

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

        let result = await projectStorage.ref('/data/rack1/observationImages').listAll();
        // let metadata = await projectStorage.ref('data').getMetadata();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
        return Promise.all(urlPromises);
    }
    
    const loadImages = async () => {
        const urls = await fetchImages();
        urls.forEach(function(item, index){
          // console.log(item, index)
        });
        // console.log(urls[1])
        setFiles(urls);
    }
    loadImages();
    }, []);

    console.log(files)


  return (
    <Card >
      <Card.Content>
      <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        {files ? 
        files.map((url)=>(
              
              <Carousel.Item>
                <img 
                className="d-block w-100" 
                key={url} 
                style={{width:"100px"}} 
                src={url} />
                <h3 >{header}</h3>
                <Card.Meta>{meta}</Card.Meta>
              <div className="pt-3" align="center">
              <Button onClick={openModal}>More Details</Button> 
              </div>
              </Carousel.Item>
            
            )                
        ):<Icon loading name='spinner'/>
        }
      
      </Carousel>

      
      
      
      </Card.Content>
    </Card>

  )
}