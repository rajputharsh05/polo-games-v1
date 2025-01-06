import { Col, Row, message, List } from "antd";
import info from "./data.json";
import styles from "./trending.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import image from "../../../public/images/evolution_gaming_banner.png";
export const News = () => {
  const location = useLocation();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (location?.pathname !== "/") {
      setData(info?.data);
    } else {
      setData(info?.data?.slice(0, 2));
    }
  }, []);

  return (
    <div
      style={{
        padding: "1vh",
        display: "flex",
        flexDirection: "column",
        gap: "1vh",
        maxHeight: "100%", // Restrict the container height
        overflowY: "auto", // Enable vertical scrolling
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
            title={ele?.description} // Show full description on hover
          >
            <p>{`${ele?.description?.substring(0, 45)}...`}</p>
            <p>{ele?.pub_date}</p>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/blogs");
      const data = response.data;
      setBlogs(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch blogs");
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
      <>
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
      </>
    </div>
  );
};

export const Reels = () => {
  const [reels, setReels] = useState<string[]>([]);
  const loaction = useLocation();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Define type for videoRefs

  const getReels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/reels/get-reels/"
      );
      const data = response.data;
      console.log(data);
      setReels(data);
    } catch (error) {
      console.error(error);
      message.error("Unable to fetch reels");
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
    <>
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
    </>
  );
};
const Trending = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <Reels></Reels>
        </div>
      </div>
      <div className={styles.trendingNews}>
        <h4>Trending News</h4>
        <News></News>
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
