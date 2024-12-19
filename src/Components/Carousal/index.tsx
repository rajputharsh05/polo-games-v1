import { useState } from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import "./Carousel.css"; // For additional custom styles

const images = [
  "https://picsum.photos/id/1011/800/300", 
  "https://picsum.photos/id/1025/800/300",
  "https://picsum.photos/id/1013/800/300",
  "https://picsum.photos/id/1012/800/300",
];

const AppCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const onChange = (current : any) => {
    setCurrentSlide(current);
  };

  return (
    <div className="carousel-container">
      <div
        className="blurred-background"
        style={{ backgroundImage: `url(${images[currentSlide]})` }}
      ></div>
      <Carousel autoplay afterChange={onChange} effect="scrollx">
        {images.map((img, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={img}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>


    </div>
  );
};

export default AppCarousel;
