import "./yo.css";
import { Col, message, Row } from "antd";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import image1 from "../../../public/images/smart_soft_gaming_banner.jpg";
import image2 from "../../../public/images/royal_gaming_banner.jpg";
import image3 from "../../../public/images/evolution_gaming_banner.png";
import image4 from "../../../public/images/play_tech_gaming_banner.jpg";

const SliderComponent = () => {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [randomIndex, setRandomIndex] = useState(0);

  // Fetch images from the backend
  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/images");
      const formattedImages = response?.data?.map((img: any) => ({
        src: img?.content,
        alt: img?.name,
      }));
      setImages(formattedImages);
    } catch (error) {
      setImages([
        {
          src: image1,
          alt: "",
        },
        {
          src: image2,
          alt: "",
        },
        {
          src: image3,
          alt: "",
        },
        {
          src: image4,
          alt: "",
        },
      ]);
      console.error(error);
      message.error("Unable to fetch images");
    }
  }, []);

  // Update random index periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length > 0) {
        const randomNumber = Math.floor(Math.random() * images.length);
        setRandomIndex(randomNumber);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col span={24}>
          {images.length > 0 ? (
            <img
              src={images[randomIndex]?.src}
              alt={images[randomIndex]?.alt || "Image"}
              className="game-image"
            />
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>
              No images available
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SliderComponent;
