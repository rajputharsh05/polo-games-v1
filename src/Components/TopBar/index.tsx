import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SideBar from "../SideBar";
import styles from "./topbar.module.scss";
import logo from "../../assets/MobileHeaderImg.png"

const TopBar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );

  const [openModal, setModalOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setModalOpen(false);
    }
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setIsSidebarVisible(currentWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setActiveTab(location.pathname.substring(1));
  }, [location]);

  const toggleDrawer = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  const handleTabClick = (key: any) => {
    setActiveTab(key);
    navigate(`/${key}`);
    if (window.innerWidth < 768) {
      setModalOpen(false);
    }
  };

  const menuItems = [
    { key: "home", label: "Home", badge: -1 },
    { key: "in-play", label: "In Play", badge: 8 },
    { key: "news", label: "News", badge: 5 },
    { key: "blogs", label: "Blogs", badge: 2 },
    { key: "reels", label: "Reels", badge: 1 },
    { key: "chat", label: "Chat", badge: -1 },
    { key: "demo-id", label: "DemoId", badge: -1 },
    { key: "call-support", label: "Call Support", badge: -1 },
  ];

  const renderMenuItems = (items: any) =>
    items.map(({ key, label, badge }: any) => (
      <div
        onClick={() => {
          console.log("Harshhh");
          handleTabClick(key);
        }}
        key={key}
        className={`${styles.topbar_item} ${
          activeTab === key ? styles.active : ""
        }`}
      >
        {label}
        {badge && badge !== -1 && (
          <span className={styles.topbar_badge}>{badge}</span>
        )}
      </div>
    ));

  return (
    <div className={styles.topbar}>
      {!isSidebarVisible && (
        <div
          className={styles.topbar_item}
          style={{ backgroundColor: "#940101" }}
          onClick={toggleDrawer}
          aria-label="Toggle Menu"
        >
          <MenuOutlined />
        </div>
      )}
      {renderMenuItems(menuItems)}
      <Drawer
        placement="left"
        onClose={toggleDrawer}
        open={openModal}
        width={200}
        bodyStyle={{
          padding: 0,
          background: "#fff",
        }}
        headerStyle={{
          display: "none",
        }}
      >
        <Row
          style={{ width: "100%", height: "10vh", backgroundColor: "rgba(12, 46, 55, 1)" , display:"flex" , justifyContent:"center" , alignItems:"center"}}
        >
          <img src={logo} style={{height:"100%" , width:"80%"}}></img>
        </Row>
        <SideBar />
      </Drawer>
    </div>
  );
};

export default TopBar;
