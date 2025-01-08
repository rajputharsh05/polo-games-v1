import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Drawer, Form, Input, message, Modal, Row } from "antd";
import { HomeFilled, IdcardFilled, MenuOutlined } from "@ant-design/icons";
import SideBar from "../SideBar";
import styles from "./topbar.module.scss";
import logo from "../../assets/MobileHeaderImg.png";
import axios from "axios";
import {
  BookSharp,
  Call,
  ChatBubble,
  Newspaper,
  Person,
  PlayCircle,
  VideoCall,
} from "@mui/icons-material";

const TopBar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );

  const [openModal, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();
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
    if (key === "admin") {
      setIsOpen(true);
    } else {
      setActiveTab(key);
      navigate(`/${key}`);

      if (window.innerWidth < 768) {
        setModalOpen(false);
      }
    }
  };

  const menuItems = [
    { key: "home", label: "Home", badge: -1, icon: <HomeFilled></HomeFilled> },
    {
      key: "in-play",
      label: "In Play",
      badge: -1,
      icon: <PlayCircle></PlayCircle>,
    },
    { key: "news", label: "News", badge: -1, icon: <Newspaper></Newspaper> },
    { key: "blogs", label: "Blogs", badge: -1, icon: <BookSharp></BookSharp> },
    { key: "reels", label: "Reels", badge: -1, icon: <VideoCall></VideoCall> },
    { key: "admin", label: "Admin", badge: -1, icon: <Person></Person> },
    { key: "chat", label: "Chat", badge: -1, icon: <ChatBubble></ChatBubble> },
    {
      key: "demo-id",
      label: "DemoId",
      badge: -1,
      icon: <IdcardFilled></IdcardFilled>,
    },
    {
      key: "call-support",
      label: "Call Support",
      badge: -1,
      icon: <Call></Call>,
    },
  ];

  const handleAdminSubmit = async (values: any) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/user/get_all_users"
      );
      const data = response?.data;

      const res = data?.filter((ele: any) => {
        if (
          ele?.phone_number === values?.phone_number &&
          ele?.username === ele?.username
        )
          return ele;
      });

      if (res) {
        message.success("Admin logged in successfull");
        navigate(`/admin`);
      }
    } catch (error) {
      console.error(error);
      message.error("Error in log in !");
    }
  };

  const renderMenuItems = (items: any) =>
    items.map(({ key, label, badge, icon }: any) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1vw !important",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => {
            handleTabClick(key);
          }}
          key={key}
          className={`${styles.topbar_item} ${
            activeTab === key ? styles.active : ""
          }`}
        >
          {icon}
          {badge && badge !== -1 && (
            <span className={styles.topbar_badge}>{badge}</span>
          )}
        </div>
        <p style={{ whiteSpace: "nowrap", fontSize: "10px", color: "white" }}>
          {label}
        </p>
      </div>
    ));

  return (
    <div className={styles.topbar}>
      {!isSidebarVisible && (
        <div  style={{
          display: "flex",
          flexDirection: "column",
          gap: "1vw !important",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div
            className={styles.topbar_item}
            onClick={toggleDrawer}
            aria-label="Toggle Menu"
          >
            <MenuOutlined />
          </div>
          <p style={{ whiteSpace: "nowrap", fontSize: "10px", color: "white" }}>
          {"categories"}
        </p>
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
          style={{
            width: "100%",
            height: "10vh",
            backgroundColor: "rgba(12, 46, 55, 1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ height: "100%", width: "80%" }}></img>
        </Row>
        <SideBar />
      </Drawer>
      <Modal
        open={isOpen}
        title="Admin Login"
        onClose={() => setIsOpen(false)}
        footer=""
        onCancel={() => setIsOpen(false)}
      >
        <Form form={form} onFinish={handleAdminSubmit}>
          <Form.Item
            name="username"
            label="User Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter your Phone Number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default TopBar;
