import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../../mushroom-imgs/1.png'
import img2 from '../../mushroom-imgs/2.png'

export default function ImageCarousel() {
  return (
    <Carousel variant='dark' style={{width: "500px", margin: "auto auto"}}>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={img1}
                alt="100201"
            />
            <Carousel.Caption>
            <h3>Sample id: 100201</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={img2}
            alt="Sample id: 100201"
            />

            <Carousel.Caption>
            <h3>Sample id: 100202</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={img1}
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Sample id: 100202</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  )
}
