import Carousel from "react-bootstrap/Carousel";
import React from "react";
import img1 from "../assets/3.jpg";
import img2 from "../assets/2.jpg";
import img8 from "../assets/8.jpg";
export const Carouseel = () => (
  <Carousel>
    <Carousel.Item>
      <img className="d-block w-99" src={img1} alt="First slide" />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-99"
        variant="top"
        src={img2}
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className=" d-block w-99" src={img8} alt="Third slide" />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
