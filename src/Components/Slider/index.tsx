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
import { motion, AnimatePresence } from "framer-motion";
export const Reels = ({ trackState, loading, reels }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollThreshold = 20;
  let touchStartY = 0;

  const handleScroll = (event: WheelEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!containerRef.current) return;

    let deltaY = 0;

    if ((event as WheelEvent).deltaY !== undefined) {
      deltaY = (event as WheelEvent).deltaY;
    } else if ((event as TouchEvent).touches) {
      const touchEvent = event as TouchEvent;
      const touchY = touchEvent.touches[0].clientY;
      deltaY = touchStartY - touchY;
    }

    if (Math.abs(deltaY) < scrollThreshold) return;

    event.stopPropagation();

    if (deltaY > 0 && currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (deltaY < 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    containerRef.current.style.pointerEvents = "none";
    setTimeout(() => {
      if (containerRef.current)
        containerRef.current.style.pointerEvents = "auto";
    }, 500);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0].clientY;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      container.addEventListener("touchmove", handleScroll, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleScroll);
      }
    };
  }, [currentIndex, reels.length]);

  return (
    <Spin spinning={loading}>
      {trackState && !loading && (
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 25,
            width: "10%",
            height: "60%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
              animation: "scroll-down 2s ease-in-out infinite",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                height: "4dvw",
                width: "4dvw",
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
                  transform: translateY(100%);
                }
                100% {
                  transform: translateY(-200%);
                }
              }
            `}
          </style>
        </div>
      )}
      <div
        ref={containerRef}
        style={{
         
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {reels.length > 0 && (
            <motion.video
              key={currentIndex}
              src={reels[currentIndex]}
              width="100%"
              height="100%"
              autoPlay
              loop
              muted
              playsInline
              controls
              controlsList="nodownload"
              style={{
                objectFit: "contain",
                borderRadius: "10px !important",
              }}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </div>
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
  const [reels, setReels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const ignoreScrollEvent = useRef(false);
  let lastVal = 0;

  const getReels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASEURL}/reels/get-reels/`);
      setReels(response.data);
      setTimeout(() => {
        setTrackState(false);
      }, 5000);
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
    if (ignoreScrollEvent.current) return;

    const container = event.currentTarget;
    const videoHeight = container.clientHeight;
    const scrollPosition = container.scrollTop;

    const isScrollingDown = scrollPosition > lastVal;
    lastVal = scrollPosition;

    let targetIndex = Math.round(scrollPosition / videoHeight);

    if (isScrollingDown) {
      targetIndex = Math.min(targetIndex + 1, reels.length - 1);
    } else {
      targetIndex = Math.max(targetIndex - 1, 0);
    }

    ignoreScrollEvent.current = true;

    container.scrollTo({
      top: targetIndex * videoHeight,
      behavior: "smooth",
    });

    if (trackState) {
      setTrackState(false);
    }

    setTimeout(() => {
      ignoreScrollEvent.current = false;
    }, 300);
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
                style={{ borderRadius: "2vh" }}
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
              {
                <img
                  src={image11}
                  alt={images[0]?.alt || "Image"}
                  style={{ height: "100%", width: "100%", borderRadius: "5px" }}
                />
              }
            </Row>
            <Row style={{ height: "35%" }}>
              {
                <img
                  src={image22}
                  alt={images[1]?.alt || "Image"}
                  style={{ height: "100%", width: "100%", borderRadius: "5px" }}
                />
              }
            </Row>
          </Col>
          <Col
            onScroll={handleScroll}
            span={14}
            style={{
              position: "relative",
              scrollbarWidth:"none",
              overflowX:"scroll"
            }}
          >
            <Reels
              trackState={trackState}
              loading={loading}
              reels={reels}
            ></Reels>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default SliderComponent;
