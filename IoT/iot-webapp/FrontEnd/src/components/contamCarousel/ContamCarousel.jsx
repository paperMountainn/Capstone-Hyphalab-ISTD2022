import React, {useEffect, useState} from 'react';
import { Card, Button } from 'semantic-ui-react';
import './contamCarousel.scss';
import { Carousel } from 'react-bootstrap';
import './contaminationCard.css'
import { FiAlertTriangle } from "react-icons/fi";
import { projectStorage } from '../../config/firebase-config';

import c1 from '../../static/c1.jpg';
import c2 from '../../static/c2.jpg';
import c3 from '../../static/c3.jpg';

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

        // for (String url : urlPromises) {
        //   // Do something
        // }
    
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

    // files && console.log(files[0])
    // files && console.log(info)

    // files.forEach(function(item, index){
    //   console.log(item, index)
    // });
    // console.log(files[4])

  return (
    <Card color={cardClass(folderRetrieved)}>
    <div>
          {files && 
          files.map((url)=>{
              return(<img key={url} style={{width:"100px"}} src={url} />)                
          })
          }
      </div>
      
      <Card.Content>
      {folderRetrieved == "contam" ? <FiAlertTriangle/> : null}
      <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        <Carousel.Item>
        
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
        </Carousel.Item>
      
      </Carousel>

      
      <div className="pt-3" align="center">
        <Button onClick={openModal}>More Details</Button> 
      </div>
      
      </Card.Content>
    </Card>

  )
}