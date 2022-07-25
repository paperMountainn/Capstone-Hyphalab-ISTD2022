import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Card, Button, Icon } from 'semantic-ui-react';
import './contamCarousel.scss';
import { Carousel } from 'react-bootstrap';
// import './contaminationCard.css'
import { FiAlertTriangle } from "react-icons/fi";
import { projectStorage } from '../../config/firebase-config';

export const ContamCarousel = ({ rackName, header, meta, openModal}) => {
  const [index, setIndex] = useState(0);
  const [contamImgs, setContamImgs] = useState();
  const [uploadedImgs, setUploadedImgs] = useState();

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

    const fetchUploadedImgsOfRack = async() => {
      let result = await projectStorage.ref(`/${rackName}/uploaded_images/`).listAll();
      let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
      return Promise.all(urlPromises);
      
    }
    

    const fetchContamImgs = async () => {

        let result = await projectStorage.ref(`/${rackName}/contam/`).listAll();
        // let metadata = await projectStorage.ref('data').getMetadata();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
        return Promise.all(urlPromises);
    }

    const test = async()=>{
      const contamUrls = await fetchContamImgs()
      return contamUrls
    }
    
    const loadImagesAndCallAPI= async () => {
        const uploadedImgUrls = await fetchUploadedImgsOfRack();
        

        if (uploadedImgUrls.length == 0){
            console.log("no new images to process now")
            // return
        }
        

        const processData = async() => {
          console.log("processing data")
          for (let uploadedImgUrl of uploadedImgUrls){
            
            fetch(uploadedImgUrl)
            .then(
              response => response.blob()
            )
            .then(
              (blob) =>  {
                var data = new FormData()
                data.append('file', blob , 'file')
  
                const stuff = axios.post('http://127.0.0.1:5001/receive', data).then(
                  (response) => {
                      // console.log(response.data)
                      // console.log(file_url)
                      const isContam = response.data
                      var httpRef = projectStorage.refFromURL(uploadedImgUrl)
                      let name = httpRef.name
  
  
                      var contamRef = projectStorage.ref(`${rackName}/contam/${name}`)
                      var noContamRef = projectStorage.ref(`${rackName}/no_contam/${name}`)
                      // console.log(name)
                      // var storeRef = projectFirestore.collection('rack2').doc('contam')
  
                      if (isContam == 'contam'){
                      
                          contamRef.put(blob).then(
                              httpRef.delete().then(
                                  () => console.log("deleted from original place")
                              )
                          )
                          
                          console.log("contam!")
                      }
                      else if (isContam == 'no_contam'){
                          console.log("nocon!")
                          noContamRef.put(blob).then(
                              httpRef.delete().then(
                                  () => console.log("deleted from original place")
                              )
                          )
                      }  
                  }
              ).catch(error=>console.log(error))
  
  
              }
            )
          }

        }

        await processData()
     


    }

    loadImagesAndCallAPI()
    }, []);

    // console.log(files)


  return (
    <Card color={cardClass(folderRetrieved)}>
    
      <Card.Content>
      {folderRetrieved == "contam" ? <FiAlertTriangle/> : null}
      <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        {contamImgs ? 
        contamImgs.map((url)=>(
              
              <Carousel.Item>
                <img 
                className="d-block w-100" 
                key={url} 
                style={{width:"100px"}} 
                src={url} />
                <h3 title="Header" data-testid="header" class={cardClass(folderRetrieved)} >{rackName}</h3>
                <Card.Meta>{meta}</Card.Meta>
              </Carousel.Item>
            
            )                
        ):<Icon loading name='spinner'/>
        }


      </Carousel>

      
      <div className="pt-3" align="center">
        <Button data-testid="button" onClick={openModal}>Check</Button> 
      </div>
      
      </Card.Content>
    </Card>

  )
}