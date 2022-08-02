import React, {useEffect, useState} from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import { projectStorage } from '../../config/firebase-config';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './homeContamImgCarousel.scss'
import { ImageModal } from '../imageModal/ImageModal';
export const HomeContamImgCarousel = () => {
    const [index, setIndex] = useState(0);
    const [rack1Contam, setRack1Contam] = useState()
    const [rack2Contam, setRack2Contam] = useState()
    const [rack3Contam, setRack3Contam] = useState()
    const [rack4Contam, setRack4Contam] = useState()
    
    
    
    const rackNames = ['Rack_1','Rack_2', 'Rack_3', 'Rack_4']
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    useEffect(() => {
    const fetchImages = async (rackName) => {

        let result = await projectStorage.ref(`/${rackName}/contam`).listAll();
        // let metadata = await projectStorage.ref('data').getMetadata();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
        return Promise.all(urlPromises);
    }
    const loadImages = async(rackName) => {
        const urls = await fetchImages(rackName)
        switch (rackName){
            case "Rack_1":
                setRack1Contam(urls)
                break
            case "Rack_2":
                setRack2Contam(urls)
                break
            case "Rack_3":
                setRack3Contam(urls)
                break
            case "Rack_4":
                setRack4Contam(urls)
                break
        }
    }
    

    for (let rackName of rackNames){

        loadImages(rackName)
        console.log("stuff")
        
    }
    
    }, []);


  return (
    <div>    
    
    {(rack1Contam && rack2Contam && rack3Contam && rack4Contam) ?
        <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false} >
            {console.log("hi")}
            {console.log(rack1Contam)}
            {console.log(rack2Contam)}
            {console.log(rack3Contam)}
            {console.log(rack4Contam)}
               <Carousel.Item >
                {(rack1Contam.length != 0) ? 
                <>
                  <img
                    className="d-block w-100" 
                    key={rackNames[0]} 
                    style={{width:"100px"}} 
                    src={rack1Contam[0]} 
                />
                
                
                <h3>{rackNames[0]} <Icon name="exclamation triangle" color='red'/> </h3><ImageModal title="Rack_1 Contamination Images" imgArr={rack1Contam}/>
                <Link to="/incubation/contaminations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                :
                <>
                <img
                    className="d-block w-100" 
                    key={rackNames[0]} 
                    style={{width:"100px"}} 
                    src="https://i.imgur.com/Cl8NpAc.png"
                />
                    
                    <h3>{rackNames[0]}<Icon name="check" color='green'/></h3>
                    No Contaminations
                    <Link to="/incubation/contaminations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                }
          
                </Carousel.Item>
                <Carousel.Item >
                {(rack2Contam.length != 0) ? 
                <>
                  <img
                    className="d-block w-100" 
                    key={rackNames[1]} 
                    style={{width:"100px"}} 
                    src={rack2Contam[0]} 
                />
                
                
                <h3>{rackNames[1]} <Icon name="exclamation triangle" color='red'/> </h3><ImageModal title="Rack_2 Contamination Images" imgArr={rack2Contam}/>
                <Link to="/incubation/contaminations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                :
                <>
                <img
                    className="d-block w-100" 
                    key={rackNames[1]} 
                    style={{width:"100px"}} 
                    
                    src="https://i.imgur.com/Cl8NpAc.png"
                />
                    
                    <h3>{rackNames[1]}<Icon name="check" color='green'/></h3>
                    No Contaminations
                    <Link to="/incubation/contaminations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                }
          
                </Carousel.Item>
                <Carousel.Item >
                {(rack3Contam.length != 0) ? 
                <>
                  <img
                    className="d-block w-100" 
                    key={rackNames[2]} 
                    style={{width:"100px"}} 
                    src={rack3Contam[0]} 
                />
                
                
                <h3>{rackNames[2]} <Icon name="exclamation triangle" color='red'/> </h3><ImageModal title="Rack_3 Contamination Images" imgArr={rack3Contam}/>
                <Link to="/incubation/contaminations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                :
                <>
                <img
                    className="d-block w-100" 
                    key={rackNames[2]} 
                    style={{width:"100px"}} 
                    src="https://i.imgur.com/Cl8NpAc.png"
                />
                    
                <h3>{rackNames[2]}<Icon name="check" color='green'/></h3>
                No Contaminations
                <Link to="/incubation/contaminations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                }
          
                </Carousel.Item>   

                <Carousel.Item >
                {(rack4Contam.length != 0) ? 
                <>
                  <img
                    className="d-block w-100" 
                    key={rackNames[3]} 
                    style={{width:"100px"}} 
                    src={rack4Contam[0]} 
                />
                
                
                <h3>{rackNames[3]} <Icon name="exclamation triangle" color='red'/> </h3><ImageModal title="Rack_4 Contamination Images" imgArr={rack4Contam}/>
                <Link to="/incubation/contaminations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                :
                <>
                <img
                    className="d-block w-100" 
                    key={rackNames[3]} 
                    style={{width:"100px"}} 
                    src="https://i.imgur.com/Cl8NpAc.png"
                />
                    
                    <h3>{rackNames[3]}<Icon name="check" color='green'/></h3>
                    No Contaminations
                    <Link to="/incubation/contaminations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                }
          
                </Carousel.Item>
                
            </Carousel>
            :
            <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
                <Icon loading name='bug' />
            </Carousel>
        }

        
    
    </div>
  )
}
