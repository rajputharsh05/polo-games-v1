import "./yo.css";
import { Col, message, Row, Spin } from "antd";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import image1 from "../../../public/images/smart_soft_gaming_banner.jpg";
import image2 from "../../../public/images/royal_gaming_banner.jpg";
import image3 from "../../../public/images/evolution_gaming_banner.png";
import image4 from "../../../public/images/play_tech_gaming_banner.jpg";
import image11 from "../../assets/01.jpg";
import image22 from "../../assets/02.jpg";

import { useLocation } from "react-router-dom";

export const Reels = ({ trackState }: any) => {
  const BASEURL = import.meta.env.VITE_BASEURL;
  const [reels, setReels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const loaction = useLocation();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Define type for videoRefs

  const getReels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASEURL}/reels/get-reels/`);
      const data = response.data;
      console.log(data);
      setReels(data);
    } catch (error) {
      console.error(error);
      message.error("Unable to fetch reels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReels();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [reels]);

  return (
    <Spin spinning={loading}>
      {trackState && !loading && (
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 25,
            width: "17%",
            height: "20%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #999999 100%)",
            color: "white",
            borderRadius: "10px",
            padding: "5px",
            zIndex: 10,
            opacity: "1",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              animation: "scroll-down 2s ease-in-out infinite",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                height: "6dvw",
                width: "6dvw",
                color: "black",
                background: "rgba(31, 31, 31, 1)",
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <style>
            {`
        @keyframes scroll-down {
          0% {
            transform: translateY(120%);
          }
          100% {
            transform: translateY(-120%);
          }
        }
      `}
          </style>
        </div>
      )}

      {loaction.pathname !== "/" && (
        <h3
          style={{
            padding: "1vh",
            color: "white",
            fontSize: "16px",
          }}
        >
          Reels Section
        </h3>
      )}
      {reels?.map((ele, index) => (
        <div
          key={index}
          style={{
            padding: "1vh",
            color: "white",
            fontSize: "16px",
          }}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            width="100%"
            height="360"
            style={{
              height: "50vh",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            autoPlay
            loop
            muted
            playsInline
            controls
          >
            <source src={ele} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </Spin>
  );
};

const SliderComponent = () => {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const BASEURL = import.meta.env.VITE_BASEURL;
  const [trackState, setTrackState] = useState<boolean>(true);
  let lastVal = 0;

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(`${BASEURL}/bannerimage/images`);
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
  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length > 0) {
        const randomNumber = Math.floor(Math.random() * images.length);
        setRandomIndex(randomNumber);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);
      console.log(windowWidth);

      if (currentWidth < 768) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const videoHeight = container.scrollHeight / 2;
    const scrollPosition = container.scrollTop;
    
    if(Math.abs(scrollPosition - lastVal) < 50) {
      return;
    }

    const isScrollingDown = scrollPosition > lastVal;
    lastVal = scrollPosition; 

    const currentIndex = Math.round(scrollPosition / videoHeight);
    let targetIndex = currentIndex;
  
    if (isScrollingDown) {
      targetIndex = Math.min(currentIndex + 1, Math.floor(container.scrollHeight / videoHeight) - 1); // Limit to last reel
    } else {
      targetIndex = Math.max(currentIndex - 1, 0);
    }
  
   
    container.scrollTo({
      top: targetIndex * videoHeight,
      behavior: "smooth",
    });
  
    if (trackState) {
      setTrackState(false);
    }
  };
  
  

  return (
    <div>
      {isSidebarVisible ? (
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={24}>
            {images.length > 0 ? (
              <img
                src={images[randomIndex]?.src}
                alt={images[randomIndex]?.alt || "Image"}
                style={{borderRadius:"2vh"}}
                className="game-image"
              />
            ) : (
              <p style={{ color: "white", textAlign: "center" }}>
                No images available
              </p>
            )}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col
            span={10}
            style={{
              height: "40vh",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <Row style={{ height: "60%" }}>
              {(
                <img
                  src={image11}
                  alt={images[0]?.alt || "Image"}
                  style={{ height: "100%", width: "100%", borderRadius: "5px" }}
                />
              ) }
            </Row>
            <Row style={{ height: "35%" }}>
              {(
                <img
                  src={image22}
                  alt={images[1]?.alt || "Image"}
                  style={{ height: "100%", width: "100%", borderRadius: "5px" }}
                /> 
              )}
            </Row>
          </Col>
          <Col
            onScroll={handleScroll}
            span={14}
            style={{ height: "40vh", overflow: "scroll" }}
          >
            <Reels trackState={trackState}></Reels>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default SliderComponent;
