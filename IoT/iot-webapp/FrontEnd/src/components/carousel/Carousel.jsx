import React, {useState} from 'react'
import { Carousel } from 'react-bootstrap';
import './carousel.scss';
import f1 from '../../static/f1.jpg';
import f2 from '../../static/f2.jpg';
import s1 from '../../static/s1.jpg';
import s2 from '../../static/s2.jpg';
import s3 from '../../static/s3.jpg';


export const MyCarousel = ({ images, location }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel fade={true} touch className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={s1}
            alt="First slide"
          />
          {/* <Carousel.Caption> */}
          <h3>Rack 1</h3>
          <p>Growth Date: 10/06/2022</p>
          
          {/* </Carousel.Caption> */}
        </Carousel.Item>
        
        <Carousel.Item>
          <img
            className="d-block w-100 h-75"
            src={s2}
            alt="Second slide"
          />
          {/* <Carousel.Caption> */}
            <h3>Rack 2</h3>
            <p>Growth Date: 10/06/2022</p>
          {/* </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={s3}
            alt="Third slide"
          />
  
          {/* <Carousel.Caption> */}
            <h3>Rack 3</h3>
            <p>Growth Date: 10/06/2022</p>
          {/* </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
  )
}
