import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css'


function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className='carousel-img'>
        <img
          // className="w-100"
          src="https://images.pexels.com/photos/6438762/pexels-photo-6438762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='carousel-img'>
        <img
          // className="w-100"
          src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="second slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='carousel-img'>
        <img
          // className="w-100 "
          src="https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="third slide" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;







































// import React, { useState } from 'react';
// import { Carousel, Container } from 'react-bootstrap';
// import './Carousel.css'

// // from chat gpt
// const ControlledCarousel = () => {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         <img
//           className="carousel-img"
//           src="https://m.media-amazon.com/images/I/61PjyZPbF4L._AC_UL480_FMwebp_QL65_.jpg"
//           alt="First slide"/>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className=" carousel-img"
//           src="https://m.media-amazon.com/images/I/61PjyZPbF4L._AC_UL480_FMwebp_QL65_.jpg"
//           alt="Second slide"  />
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="carousel-img"
//           src="https://m.media-amazon.com/images/I/61PjyZPbF4L._AC_UL480_FMwebp_QL65_.jpg"
//           alt="Third slide" />
//       </Carousel.Item>
//     </Carousel>
//   );
// };

// export default ControlledCarousel;
