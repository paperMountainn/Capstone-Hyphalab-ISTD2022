import React, {useEffect, useState} from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import { Carousel } from 'react-bootstrap';
import { projectStorage } from '../../config/firebase-config';
import { ImageModal } from '../imageModal/ImageModal';
import { db_time_parser } from '../../utils/dateHelper';

export const ObservationCarousel = ({rackName, openModal, type}) => {
  console.log(rackName)
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState();
  const [metas, setMetas] = useState();
  const [info, setInfo] = useState();


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

        let result = await projectStorage.ref(`${rackName}/${type}`).listAll();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL())

    
        return Promise.all(urlPromises)
    }
    const fetchMetadatas = async() => {
      let result = await projectStorage.ref(`${rackName}/${type}`).listAll();
      let metaPromises = result.items.map(imageRef => imageRef.getMetadata())
      return Promise.all(metaPromises)
    }
    
    const loadImages = async () => {
        const urls = await fetchImages();
        const metaDatas = await fetchMetadatas();
        console.log("hi")
        console.log(urls)
        console.log(metaDatas)
        setFiles(urls)
        setMetas(metaDatas)
    }
    loadImages();
    }, []);

    


  return (
    <Card color='blue'>
      <Card.Content>
      <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        {(files && metas)? 
        files.map((url, i)=>(
              
              <Carousel.Item>
                {type=="observe_incub" ? <p>Incubation Area</p> : <p>Fruiting Area</p>}
                <img 
                className="d-block w-100" 
                key={url} 
                style={{width:"100px"}} 
                src={url} />
                <h5>{rackName} <Icon name="camera" color='blue'/> </h5>
                <h6>Image Date: {db_time_parser(new Date(metas[i].timeCreated))}</h6>
                {/* <Card.Meta>{metas[i].timeCreated}</Card.Meta> */}
                
              {/* <div className="pt-3" align="center"> */}
              {/* <Button onClick={openModal}>More Details</Button>  */}
              {/* </div> */}
              </Carousel.Item>
            
            )                
        ):<Icon loading name='spinner'/>
        }
      
      </Carousel>
      <ImageModal imgArr={files} title={`${rackName} Observation Images`}/>
      {/* <div className="pt-3" align="center">
        <Button data-testid="button" onClick={openModal}><Icon name="magnify"/>Check</Button> 
      </div> */}

      
      
      
      </Card.Content>
    </Card>
  
  )
}