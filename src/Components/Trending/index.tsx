import { Col, Row, message, List, Spin, Card } from "antd";
import info from "./data.json";
import styles from "./trending.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../../public/images/evolution_gaming_banner.png";
import { FireFilled } from "@ant-design/icons";

export const News = () => {
  const location = useLocation();
  const [data, setData] = useState<any[]>([]);
  const [seletedData, setSeletedData] = useState<any>(data[0]);

  useEffect(() => {
    if (info?.data?.length > 0) {
      if (location?.pathname !== "/") {
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

  const getBlogs = async () => {
    try {
      setloading(true);
      const response = await axios.get(`${BASEURL}/blogs`);
      const data = response.data;
      setBlogs(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch blogs");
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
      <Card loading={loading}>
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
    </div>
  );
};

export const Reels = ({trackState} : any) => {
  const [reels, setReels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const BASEURL = import.meta.env.VITE_BASEURL;
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
            width: "12%",
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

      {location.pathname !== "/" && location?.pathname !== "/home" && (
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
      <div>
        {reels?.map((ele, index) => (
          <div
            key={index}
           
            style={{
              padding: "1vh",
              color: "white",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              width="100%"
              height="360"
             
              style={{
                height: "75vh",
                width: "90%",
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
      </div>
    </Spin>
  );
};

const Trending = () => {
  const navigate = useNavigate();
  const [trackState, setTrackState] = useState<boolean>(true);

  const handleScroll = () => {
    console.log("heyyy");
    if (trackState) {
      setTrackState(false);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div onScroll={handleScroll}  className={styles.imageWrapper}>
          <Reels trackState={trackState}></Reels>
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
