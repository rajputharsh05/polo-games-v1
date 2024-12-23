import { Layout } from "antd";
import { useOutlet } from "react-router-dom";
import HeaderComponent from "../../Components/Header";
const { Content, Header } = Layout;
import styles from "../GlobalLayout/globalLayout.module.scss";
import { useEffect, useState } from "react";
import MobileHeader from "../../Components/MobileHeader";

const ProtectedLayout = () => {
  const outlet = useOutlet();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    useEffect(() => {
      const handleResize = () => {
        const currentWidth = window.innerWidth;
        setWindowWidth(currentWidth);
        console.log(windowWidth)
    
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

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "rgba(12, 46, 55, 1)",
      }}
    >
      <Header
        style={{
          background: "rgba(12, 46, 55, 1)",
          position: "fixed",
          top: 0,
          width: "100vw",
          zIndex: 1000,
          height: "10vh",
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
      <Layout style={{ marginTop: "12vh", background: "rgba(12, 46, 55, 1)" }}>
        <Content
          style={{
            overflow: "auto",
            background: "rgba(12, 46, 55, 1)",
          }}
          className={styles.content_wrapper}
        >
          {outlet}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;
