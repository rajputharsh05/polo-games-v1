import "./yo.css";
import { Col, message, Row } from "antd";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

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
