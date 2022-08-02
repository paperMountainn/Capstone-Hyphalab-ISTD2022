import React, {useEffect, useState} from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import { projectStorage } from '../../config/firebase-config';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './homeObservationImgCarousel.scss'
import { ImageModal } from '../imageModal/ImageModal';
export const HomeObservationImgCarousel = ({type}) => {
    const [index, setIndex] = useState(0);
    const [rack1Obs, setRack1Obs] = useState()
    const [rack2Obs, setRack2Obs] = useState()
    const [rack3Obs, setRack3Obs] = useState()
    const [rack4Obs, setRack4Obs] = useState()
    
    const rackNames = ['Rack_1','Rack_2', 'Rack_3', 'Rack_4']
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const fetchImages = async (rackName) => {
    
            let result = await projectStorage.ref(`/${rackName}/${type}`).listAll();
            // let metadata = await projectStorage.ref('data').getMetadata();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
            return Promise.all(urlPromises);
        }
        const loadImages = async(rackName) => {
            const urls = await fetchImages(rackName)
            switch (rackName){
                case "Rack_1":
                    setRack1Obs(urls)
                    break
                case "Rack_2":
                    setRack2Obs(urls)
                    break
                case "Rack_3":
                    setRack3Obs(urls)
                    break
                case "Rack_4":
                    setRack4Obs(urls)
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
        {(rack1Obs && rack2Obs && rack3Obs && rack4Obs) ?
        <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false} >
               <Carousel.Item >
                {type=="observe_incub" ? <p>Incubation Area</p> : <p>Fruiting Area</p>}
                {(rack1Obs.length != 0) ? 
                <>
                  <img
                    className="d-block w-100" 
                    key={rackNames[0]} 
                    style={{width:"100px"}} 
                    src={rack1Obs[0]} 
                />
                
                
                <h3>{rackNames[0]} <Icon name="camera" color='blue'/> </h3><ImageModal title="Rack_1 Observation Images" imgArr={rack1Obs}/>
                <Link to="/incubation/observations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                :
                <>
                <img
                    className="d-block w-100" 
                    key={rackNames[0]} 
                    style={{width:"100px"}} 
                    src="https://i.imgur.com/Cl8NpAc.png"
                />
                    No observations
                    <h3>{rackNames[0]}<Icon name="check" color='green'/></h3>
                    <Link to="/incubation/observations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                }
          
                </Carousel.Item>
                <Carousel.Item >
                {type=="observe_incub" ? <p>Incubation Area</p> : <p>Fruiting Area</p>}
                {(rack2Obs.length != 0) ? 
                <>
                  <img
                    className="d-block w-100" 
                    key={rackNames[1]} 
                    style={{width:"100px"}} 
                    src={rack2Obs[0]} 
                />
                
                
                <h3>{rackNames[1]} <Icon name="camera" color='blue'/> </h3><ImageModal title="Rack_2 Observation Images" imgArr={rack2Obs}/>
                <Link to="/incubation/observations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                :
                <>
                <img
                    className="d-block w-100" 
                    key={rackNames[1]} 
                    style={{width:"100px"}} 
                    
                    src="https://i.imgur.com/Cl8NpAc.png"
                />
                    No observations
                    <h3>{rackNames[1]}<Icon name="check" color='green'/></h3>
                    <Link to="/incubation/observations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                }
          
                </Carousel.Item>
                <Carousel.Item >
                {type=="observe_incub" ? <p>Incubation Area</p> : <p>Fruiting Area</p>}
                {(rack3Obs.length != 0) ? 
                <>
                  <img
                    className="d-block w-100" 
                    key={rackNames[2]} 
                    style={{width:"100px"}} 
                    src={rack3Obs[0]} 
                />
                
                
                <h3>{rackNames[2]} <Icon name="camera" color='blue'/> </h3><ImageModal title="Rack_3 Contamination Images" imgArr={rack3Obs}/>
                <Link to="/incubation/observations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                :
                <>
                <img
                    className="d-block w-100" 
                    key={rackNames[2]} 
                    style={{width:"100px"}} 
                    src="https://i.imgur.com/Cl8NpAc.png"
                />
                    No observations
                <h3>{rackNames[2]}<Icon name="check" color='green'/></h3>
                <Link to="/incubation/observations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                }
          
                </Carousel.Item>   

                <Carousel.Item >
                {type=="observe_incub" ? <p>Incubation Area</p> : <p>Fruiting Area</p>}
                {(rack4Obs.length != 0) ? 
                <>
                  <img
                    className="d-block w-100" 
                    key={rackNames[3]} 
                    style={{width:"100px"}} 
                    src={rack4Obs[0]} 
                />
                
                
                <h3>{rackNames[3]} <Icon name="camera" color='blue'/> </h3><ImageModal title="Rack_4 Observation Images" imgArr={rack4Obs}/>
                <Link to="/incubation/observations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                :
                <>
                <img
                    className="d-block w-100" 
                    key={rackNames[3]} 
                    style={{width:"100px"}} 
                    src="https://i.imgur.com/Cl8NpAc.png"
                />
                    No observations
                    <h3>{rackNames[3]}<Icon name="check" color='green'/></h3>
                    <Link to="/incubation/observations"><p>Go to Observation Page  <Icon name="arrow alternate circle right"/></p></Link>
                </>
                }
          
                </Carousel.Item>
                
            </Carousel>
            :
            <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
                <Icon loading name='camera' />
            </Carousel>
        }

        
    </div>
  )
}
