import { Layout } from "antd";
import SideBar from "../../Components/SideBar";
import { useOutlet } from "react-router-dom";
import styles from "./globalLayout.module.scss";
import HeaderComponent from "../../Components/Header";
import TopBar from "../../Components/TopBar";
import { useEffect, useState } from "react";
import DynamincFooter from "../../Components/DynamicFooter";

const { Sider, Content, Header } = Layout;
const GlobalLayout = () => {
  const outlet = useOutlet();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);

   
      if (currentWidth < 768) {
        setIsSidebarVisible(false); 
      } else {
        setIsSidebarVisible(true);
      }
    };
   
    window.addEventListener("resize", handleResize);

    return () => {
      console.log(windowWidth)
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        background:
          "linear-gradient(to bottom right, rgba(99, 235, 218, 0.1) 0%, rgba(255, 163, 218, 0.1) 27%, rgba(180, 151, 255, 0.1) 66%, rgba(172, 234, 255, 0.1) 100%)",
      }}
    >
      <Header
        style={{
          background: "black",
          padding: "0 20px",
          borderBottom: "1px solid #dcdcdc",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          height: "10vh",
        }}
      >
        <HeaderComponent></HeaderComponent>
      </Header>

      <Layout style={{ marginTop: "10vh" }}>
        {isSidebarVisible && (
          <Sider
            className={styles.sider}
            style={{
              background: "#fff",
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
        >
          <TopBar></TopBar>
          <div className={styles.content}>{outlet}</div>
          <DynamincFooter></DynamincFooter>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GlobalLayout;
