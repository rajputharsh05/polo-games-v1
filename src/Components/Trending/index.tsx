import { Col, Row, message, List, Spin, Card } from "antd";
import info from "./data.json";
import styles from "./trending.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../../public/images/evolution_gaming_banner.png";
import { FireFilled } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";


export const News = () => {
  const location = useLocation();
  const [data, setData] = useState<any[]>([]);
  const [seletedData, setSeletedData] = useState<any>(data[0]);

  useEffect(() => {
    if (info?.data?.length > 0) {
      if (location?.pathname === "/news") {
        setData(info?.data);
        setSeletedData(info?.data[0]);
      } else {
        setData(info?.data?.slice(0, 2));
      }
    }
  }, [location, info]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {location?.pathname !== "/" && location?.pathname !== "/home" && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10, // Ensures it stays above other elements
              padding: "1vh",
            }}
          >
            <Row justify={"center"}>
              <h3
                style={{
                  color: "white",
                  fontFamily: "Popines",
                  marginTop: "1vh",
                  marginBottom: "1vh",
                }}
              >
                Trending News <FireFilled />
              </h3>
              <Col span={24}>
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    className={styles.imageStyle}
                    src={seletedData?.image}
                    alt=""
                  />
                </Card>
              </Col>
              <Col
                span={24}
                style={{
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                title={seletedData?.description}
              >
                <p>{`${seletedData?.description}`}</p>
                <p style={{ marginTop: "5px", fontWeight: "600" }}>
                  {seletedData?.pub_date}
                </p>
              </Col>
            </Row>
          </div>
        )}

        {/* Scrollable Content */}
        <div
          style={{
            flex: 1, // Takes up remaining space
            overflowY: "auto", // Enables scrolling for this section
            padding: "1vh",
            color: "white",
            fontSize: "16px",
          }}
          className={styles.trending_container}
        >
          {data?.map((ele, index) => (
            <Row
              key={index}
              gutter={[16, 16]}
              style={{
                paddingBottom: "1vh",
                marginBottom: "1vh",
              }}
              onClick={() => {
                setSeletedData(ele);
                document
                  .querySelector(`.${styles.trending_container}`)
                  ?.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
              }}
            >
              <Col span={8}>
                <img
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                  src={ele?.image}
                  alt=""
                />
              </Col>
              <Col
                span={16}
                style={{ color: "white", cursor: "pointer" }}
                title={ele?.description}
              >
                <p>{`${ele?.description?.substring(0, 45)}...`}</p>
                <p>{ele?.pub_date}</p>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </>
  );
};

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const BASEURL = import.meta.env.VITE_BASEURL;
  const [loading, setloading] = useState(false);
  const location = useLocation();

  const getBlogs = async () => {
    try {
      setloading(true);
      const response = await axios.get(`${BASEURL}/blogs`);
      const data = response.data;
      if (location.pathname !== "blogs") {
        setBlogs(data?.slice(0, 1));
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div
      style={{
        padding: "1vh",
        color: "white",
        fontSize: "16px",
      }}
      className={styles.Blogs}
    >
      <Spin spinning={loading}>
        <Card>
          <List
            dataSource={blogs}
            renderItem={(item: any) => (
              <List.Item>
                <div style={{ flex: 1, color: "white" }}>
                  <h3>{item?.title}</h3>
                  <p style={{ margin: 0 }}>{item?.content}</p>
                  <p style={{ margin: 0 }}>
                    <strong>Author:</strong> {item?.author}
                  </p>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </Spin>
    </div>
  );
};


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
      if (containerRef.current) containerRef.current.style.pointerEvents = "auto";
    }, 500);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0].clientY;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: false });
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
                height: "2dvw",
                width: "2dvw",
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
          height: "60vh",
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

const Trending = () => {
  const BASEURL = import.meta.env.VITE_BASEURL;
  const [reels, setReels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [trackState, setTrackState] = useState<boolean>(true);
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
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div onScroll={handleScroll} className={styles.imageWrapper}>
          <Reels trackState={trackState} loading={loading} reels={reels}></Reels>
        </div>
      </div>
      <div className={styles.trendingNews}>
        <h4
          onClick={() => {
            navigate("/news");
          }}
        >
          {(location?.pathname === "/" || location?.pathname === "/home") &&
            "Trending News"}
        </h4>
        <News></News>
      </div>

      <div className={styles.trendingNews}>
        <h4
          onClick={() => {
            navigate("/blogs");
          }}
        >
          Blogs
        </h4>
        <Blogs></Blogs>
      </div>

      <div className={styles.exploreMore}>
        <h4>Explore More</h4>
        <img src={image} alt="Casino" className={styles.exploreImage} />
      </div>
      <div className={styles.footer}>
        <p>24X7 Support</p>
        <p>100% SAFE - Protected connection and encrypted data</p>
        <p>© Copyright 2024. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Trending;
