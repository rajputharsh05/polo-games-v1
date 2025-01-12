import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Row,
} from "antd";
import { HomeOutlined, IdcardFilled, LeftOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";

import styles from "./topbar.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.png";
import onlineChatImg from "../../assets/cryptocurrency-color_chat.png";
import whatsAppChatImg from "../../assets/logos_whatsapp-icon.png";
import axios from "axios";
import {
  PlayCircleOutlined,
  TrophyOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import {
  BookSharp,
  Call,
  Newspaper,
  Person,
  PlayCircle,
  Telegram,
  VideoCall,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const TopBar = () => {
  const BASEURL = import.meta.env.VITE_BASEURL;
  const loaction = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { Sider } = Layout;

  const navigation = useNavigate();
  const cricket = useSelector((state: any) => state?.match?.cricket); // Fix typo
  const tennis = useSelector((state: any) => state?.match?.tennis);
  const soccer = useSelector((state: any) => state?.match?.soccer);
  console.log(cricket);

  const menuItemsSideBar: any = [
    {
      key: "in-play",
      icon: <PlayCircleOutlined />,
      label: (
        <div className={styles.menuItem}>
          <span>In Play</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.LiveCircle}></div>
            </div>
            <div className={styles.LiveSectionSecond}>
              {cricket + soccer + tennis}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "cricket",
      icon: <TrophyOutlined />,
      label: (
        <div className={styles.menuItem}>
          <span>Cricket</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.LiveCircle}></div>
            </div>
            <div className={styles.LiveSectionSecond}>{cricket}</div>
          </div>
        </div>
      ),
    },
    {
      key: "soccer",
      icon: <RadarChartOutlined />,
      label: (
        <div className={styles.menuItem}>
          <span>Soccer</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.LiveCircle}></div>
            </div>
            <div className={styles.LiveSectionSecond}>{soccer}</div>
          </div>
        </div>
      ),
    },
    {
      key: "tennis",
      icon: <TrophyOutlined />,
      label: (
        <div className={styles.menuItem}>
          <span>Tennis</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.LiveCircle}></div>
            </div>
            <div className={styles.LiveSectionSecond}>{tennis}</div>
          </div>
        </div>
      ),
    },
    {
      key: "horse-racing",
      icon: <TrophyOutlined />,
      label: "Horse Racing",
    },
    {
      key: "rugby-union",
      icon: <TrophyOutlined />,
      label: "Rugby Union",
    },
    {
      key: "golf",
      icon: <TrophyOutlined />,
      label: "Golf",
    },
    {
      key: "esports",
      icon: <TrophyOutlined />,
      label: "Esports",
    },
    {
      key: "mma",
      icon: <TrophyOutlined />,
      label: "MMA",
    },
    {
      key: "gaelic-games",
      icon: <TrophyOutlined />,
      label: "Gaelic Games",
    },
    {
      key: "volleyball",
      icon: <TrophyOutlined />,
      label: "Volleyball",
    },
    {
      key: "handball",
      icon: <TrophyOutlined />,
      label: "Handball",
    },
    {
      key: "australian-rules",
      icon: <TrophyOutlined />,
      label: "Australian Rules",
    },
    {
      key: "ice-hockey",
      icon: <TrophyOutlined />,
      label: "Ice Hockey",
    },
    {
      key: "snooker",
      icon: <TrophyOutlined />,
      label: "Snooker",
    },
    {
      key: "darts",
      icon: <TrophyOutlined />,
      label: "Darts",
    },
    {
      key: "cycling",
      icon: <TrophyOutlined />,
      label: "Cycling",
    },
    {
      key: "special-bets",
      icon: <TrophyOutlined />,
      label: "Special Bets",
    },
    {
      key: "table-tennis",
      icon: <TrophyOutlined />,
      label: "Table Tennis",
    },
  ];

  const handleOnClick = (data: any) => {
    const res = [
      "in-play",
      "cricket",
      "tennis",
      "soccer",
      "horse-racing",
    ].findIndex((ele) => ele === data?.key);
    if (res != -1) {
      navigation(`/${data?.key}`);
    }
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );

  const [openModal, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const supportMenu = (
    <Menu>
      <Menu.Item key="1">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "black", // Adjust text color as needed
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "rgba(217, 217, 217, 1)",
            padding: "1vh",
            borderRadius: "3vh",
            justifyContent: "space-between",
          }}
        >
          <p>Online Chat</p>
          <img src={onlineChatImg} height={"20%"} width={"20%"}></img>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "black",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "rgba(217, 217, 217, 1)",
            padding: "1vh",
            borderRadius: "3vh",
            justifyContent: "space-between",
          }}
          onClick={() => {
            const phoneNumber = "9333333330";
            const message = "Hello, I would like to connect with you!";
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`;
            window.open(whatsappURL, "_blank");
          }}
        >
          <p>Whatsapp Chat</p>
          <img src={whatsAppChatImg} height={"20%"} width={"20%"}></img>
        </div>
      </Menu.Item>
    </Menu>
  );

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
    } else if (key === "chat-support") {
      setIsDropdownOpen(true);
      setActiveTab(key);
    } else if (key === "call-us") {
      // Replace "1234567890" with the desired phone number
      window.location.href = "tel:9333333330";
    } else {
      setActiveTab(key);
      navigate(`/${key}`);

      if (window.innerWidth < 768) {
        setModalOpen(false);
      }
    }
  };

  const IconStyle = {
    fontSize: "30px",
  };

  const menuItems = [
    {
      key: "/",
      label: "Home",
      badge: -1,
      icon: <HomeOutlined style={IconStyle}></HomeOutlined>,
    },
    {
      key: "auth",
      label: "Login",
      badge: -1,
      icon: <Person style={IconStyle}></Person>,
    },
    {
      key: "chat-support",
      label: "Chat Support",
      badge: -1,
      icon: <Telegram style={IconStyle}></Telegram>,
    },
    {
      key: "call-us",
      label: "Call us",
      badge: -1,
      icon: <Call style={IconStyle}></Call>,
    },
    {
      key: "in-play",
      label: "In Play",
      badge: -1,
      icon: <PlayCircle style={IconStyle}></PlayCircle>,
    },
    {
      key: "news",
      label: "News",
      badge: -1,
      icon: <Newspaper style={IconStyle}></Newspaper>,
    },
    {
      key: "blogs",
      label: "Blogs",
      badge: -1,
      icon: <BookSharp style={IconStyle}></BookSharp>,
    },
    {
      key: "reels",
      label: "Reels",
      badge: -1,
      icon: <VideoCall style={IconStyle}></VideoCall>,
    },

    {
      key: "auth",
      label: "Demo Id",
      badge: -1,
      icon: <IdcardFilled style={IconStyle}></IdcardFilled>,
    },
  ];

  const handleAdminSubmit = async (values: any) => {
    try {
      const response = await axios.get(`${BASEURL}/user/get_all_users`);
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

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200; // Adjust scroll distance
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (

  
    <>
      
      {loaction?.pathname !== "/auth" && (
        <div className={styles.topbar}>
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Left Button */}
            <button
              onClick={() => scroll("left")}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <LeftOutlined></LeftOutlined>
            </button>

            {/* Scrollable Menu */}
          <div
              ref={containerRef}
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "1vw",
                flexGrow: 1,
                padding: "10px 0",
                scrollbarWidth: "none", // For Firefox
              }}
            >
              {!isSidebarVisible && loaction?.pathname !== "/auth" && (
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
                    className={styles.topbar_item}
                    onClick={toggleDrawer}
                    aria-label="Toggle Menu"
                  >
                    <MenuOutlined />
                  </div>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: "10px",
                      color: "white",
                    }}
                  >
                    {"Categories"}
                  </p>
                </div>
              )}
              {menuItems.map(({ key, label, badge, icon }: any) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    onClick={() => handleTabClick(key)}
                    className={`${styles.topbar_item} ${
                      activeTab === key ? styles.active : ""
                    }`}
                  >
                    {icon}
                    {badge && badge !== -1 && (
                      <span className={styles.topbar_badge}>{badge}</span>
                    )}
                  </div>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: "10px",
                      color: "white",
                    }}
                  >
                    {label}
                  </p>
                  {label === "Chat Support" && (
                    <Dropdown
                      key={key}
                      overlay={supportMenu}
                      visible={isDropdownOpen}
                      onVisibleChange={(flag) => setIsDropdownOpen(flag)}
                    >
                      <div onClick={() => handleTabClick(key)}></div>
                    </Dropdown>
                  )}
                </div>
              ))}
            </div>

            
            <button
              onClick={() => scroll("right")}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",  
              }}
            >
              <RightOutlined></RightOutlined>
            </button>
          </div>
          <Drawer
            placement="left"
            onClose={toggleDrawer}
            open={openModal}
            width={250}
            bodyStyle={{
              padding: 0,
              background: "#fff",
            }}
            style={{
              overflow: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
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
              <img src={logo} style={{ height: "80%", width: "40%" }}></img>
            </Row>
            <Row
              style={{
                background:
                  "linear-gradient(rgb(12, 46, 55) -16.64%, rgb(0, 0, 0) 100%)",
              }}
            >
              <Sider
                width={"60vw"}
                style={{
                  background:
                    "linear-gradient(180deg, #0C2E37 -16.64%, #000000 100%)",
                  display: "",
                  color: "white !important",
                  width: "100%",
                  overflow: "scroll",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["home"]}
                  defaultOpenKeys={[]}
                  items={menuItemsSideBar}
                  onClick={handleOnClick}
                  className={styles.sidebarMenu}
                />
              </Sider>
            </Row>
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
      )}
    </>
  );
};

export default TopBar;
