import { Layout, Button } from "antd";
import SideBar from "../../Components/SideBar";
import { useOutlet } from "react-router-dom";
import styles from "./globalLayout.module.scss";
import HeaderComponent from "../../Components/Header";
import { useEffect, useState } from "react";
import DynamincFooter from "../../Components/DynamicFooter";
import Trending from "../../Components/Trending";
import { MessageOutlined } from "@ant-design/icons";

const { Sider, Content, Header } = Layout;

const GlobalLayout = () => {
  const outlet = useOutlet();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isChatVisible, setIsChatVisible] = useState(false); // Chat menu visibility

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      console.log(windowWidth);
      setWindowWidth(currentWidth);

      if (currentWidth < 768) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
      }}
    >
      <Header
        style={{
          background: "black",
          position: "fixed",
          top: 0,
          width: "100vw",
          zIndex: 1000,
          height: "10vh",
          padding: "0px 0px",
        }}
      >
        <HeaderComponent></HeaderComponent>
      </Header>

      <Layout style={{ marginTop: "12vh", background: "rgba(12, 46, 55, 1)" }}>
        {isSidebarVisible && (
          <Sider
            style={{
              background: "rgba(12, 46, 55, 1)",
              borderRadius: "3vh",
              margin: "1rem",
            }}
          >
            <SideBar />
          </Sider>
        )}

        <Content
          style={{
            overflow: "auto",
            background: "transparent",
          }}
          className={styles.content_wrapper}
        >
          <div>{outlet}</div>

          <DynamincFooter></DynamincFooter>
        </Content>

        {isSidebarVisible && (
          <Sider
            style={{
              background: "rgba(12, 46, 55, 1)",
              borderRadius: "3vh",
              border: "1px solid black",
              margin: "1rem",
            }}
            width="25vw"
          >
            <Trending></Trending>
          </Sider>
        )}
      </Layout>

      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        style={{
          position: "fixed",
          bottom: "5rem",
          left: "2rem",
          zIndex: 1100,
          backgroundColor: "#1890ff",
        }}
        onClick={() => setIsChatVisible(!isChatVisible)}
      />

      {isChatVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "5rem",
            left: "2rem",
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
