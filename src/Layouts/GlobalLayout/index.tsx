import { Layout, Button, message } from "antd";
import SideBar from "../../Components/SideBar";
import { useLocation, useOutlet } from "react-router-dom";
import styles from "./globalLayout.module.scss";
import HeaderComponent from "../../Components/Header";
import { useEffect, useState } from "react";
import DynamincFooter from "../../Components/DynamicFooter";
import Trending from "../../Components/Trending";
import icon from "../../assets/ic_round-support-agent.png";
import MobileHeader from "../../Components/MobileHeader";
import TopBar from "../../Components/TopBar";
import axios from "axios";
import ballAnimation from "../../assets/Ball animation.gif";

const { Sider, Content, Header } = Layout;

const GlobalLayout = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const [text, setText] = useState([]);

  const getTexts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/marqueetext/statements"
      );
      const data = response.data;
      console.log(data);
      setText(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch texts");
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isChatVisible, setIsChatVisible] = useState(false); // Chat menu visibility

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
    getTexts();
  }, []);

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        background: "rgba(12, 46, 55, 1)",
      }}
    >
      {location.pathname !== "/auth" && (
        <Header
          style={{
            background: "rgba(12, 46, 55, 1)",
            position: "fixed",
            top: 0,
            width: "100vw",
            zIndex: 1000,
            height: "8vh",
            padding: "0px 0px",
          }}
        >
          {isSidebarVisible ? (
            <HeaderComponent></HeaderComponent>
          ) : (
            <>
              <MobileHeader></MobileHeader>
            </>
          )}
        </Header>
      )}

      <Layout
        style={
          location.pathname !== "/auth"
            ? { marginTop: "12vh", background: "rgba(12, 46, 55, 1)" }
            : { background: "rgba(12, 46, 55, 1)" }
        }
      >
        {isSidebarVisible && (
          <Sider
            width="20vw"
            style={{
              background: "rgba(12, 46, 55, 1)",
              borderRadius: "3vh",
              height: "87vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <SideBar />
          </Sider>
        )}

        <Content
          style={{
            overflow: "auto",
            overflowX:"hidden",
            background: "rgba(12, 46, 55, 1)",
          }}
          className={styles.content_wrapper}
        >
          {!isSidebarVisible && <TopBar></TopBar>}
          <div>{outlet}</div>
          <DynamincFooter></DynamincFooter>
        </Content>

        {isSidebarVisible && (
          <>
            {
              <div className={styles["marquee-container"]}>
                {text?.map((ele: any, index: number) => (
                  <div key={index} className={styles["marquee-content"]}>
                    {ele?.content}
                  </div>
                ))}
              </div>
            }
            <Sider
              style={{
                background: "#03141e",
                borderRadius: "3vh",
                border: "1px solid black",
                overflow: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              width="25vw"
            >
              <Trending></Trending>
            </Sider>
          </>
        )}
      </Layout>

      <div
        className={styles.animated_button}
        onClick={() => setIsChatVisible(!isChatVisible)}
      >
        <img style={{ height: "80%", width: "90%" }} src={icon}></img>
      </div>

      {
        location.pathname !== "/auth" &&

        <div className={styles.animated_id}>
        <img
          style={{ height: "100%", width: "100%" }}
          src={ballAnimation}
          ></img>
        </div>
      }

      {isChatVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "0rem",
            right: "0rem",
            width: "300px",
            height: "400px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1100,
            padding: "1rem",
            overflowY: "auto",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ margin: 0 }}>Chatbot</h3>
            <Button
              type="text"
              onClick={() => setIsChatVisible(false)}
              style={{ fontSize: "16px" }}
            >
              ✖
            </Button>
          </div>
          <p>Hi there! How can I help you today?</p>
        </div>
      )}
    </Layout>
  );
};

export default GlobalLayout;
