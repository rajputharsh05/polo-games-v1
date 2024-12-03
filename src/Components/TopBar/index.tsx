import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SideBar from "../SideBar";
import styles from "./topbar.module.scss";

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

  // Handle active tab based on location
  useEffect(() => {
    setActiveTab(location.pathname.substring(1));
  }, [location]);

  const handleTabClick = useCallback((key : any) => {
    setActiveTab(key);
    navigate(`/${key}`);
    if (window.innerWidth < 768) {
      setModalOpen(false); 
    }
  }, [navigate]);

  const toggleDrawer = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  const menuItems = [
    { key: "home", label: "Home"  , badge: -1},
    { key: "in-play", label: "In Play", badge: 8 },
    { key: "cricket", label: "Cricket", badge: 5 },
    { key: "soccer", label: "Soccer", badge: 2 },
    { key: "tennis", label: "Tennis", badge: 2 },
    { key: "horse-racing", label: "Horse Racing", badge: 1 },
    { key: "rugby-union", label: "Rugby Union" },
    { key: "golf", label: "Golf" },
    { key: "esports", label: "Esports" },
    { key: "mixed-martial-arts", label: "Mixed Martial Arts" },
    { key: "gaelic-games", label: "Gaelic Games" },
    { key: "volleyball", label: "Volleyball" },
    { key: "handball", label: "Handball" },
    { key: "australian-rules", label: "Australian Rules" },
    { key: "ice-hockey", label: "Ice Hockey" },
    { key: "basketball", label: "Basketball" },
    { key: "baseball", label: "Baseball" },
    { key: "american-football", label: "American Football" },
    { key: "snooker", label: "Snooker" },
    { key: "darts", label: "Darts" },
    { key: "cycling", label: "Cycling" },
    { key: "special-bets", label: "Special Bets" },
    { key: "motor-sport", label: "Motor Sport" },
    { key: "table-tennis", label: "Table Tennis" },
  ];
  
  const renderMenuItems = (items : any) =>
    items.map(({ key, label, badge } : any) => (
      <div
        key={key}
        className={`${styles.topbar_item} ${
          activeTab === key ? styles.active : ""
        }`}
        onClick={() => badge && badge !== 0 && handleTabClick(key)}
      >
        {label}
        {badge && badge !== -1 && <span className={styles.topbar_badge}>{badge}</span>}
      </div>
    ));

  return (
    <div className={styles.topbar}>
      {!isSidebarVisible && (
        <div
          className={styles.topbar_item}
          style={{ backgroundColor: "red" }}
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
        <Row style={{ width: "100%", height: "10vh", backgroundColor: "black" }} />
        <SideBar />
      </Drawer>
    </div>
  );
};

export default TopBar;
