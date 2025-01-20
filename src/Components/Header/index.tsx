import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";
import styles from "./header.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.png";
import { SearchOutlined } from "@ant-design/icons";
import inplay from "../../assets/inplay.png";
import Home from "../../assets/Home.png";
import whatsApp from "../../assets/whatsapp.png";
import AboutUS from "../../assets/about us.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import call from "../../assets/call.png";
import onlineChatImg from "../../assets/cryptocurrency-color_chat.png";
import whatsAppChatImg from "../../assets/logos_whatsapp-icon.png";
import Cookies from "js-cookie";
import { WhatsApp } from "@mui/icons-material";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_BASEURL;

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const [loginModal, setLoginModal] = useState(false);

  const [enterOtp, setEnterOtp] = useState(false);

  const [loginOrRegister, setLoginOrRegister] = useState(false);

  const [currentPHoneNumber, setCurrentPhoneNumber] = useState<number>();

  const [loading, setLoading] = useState(false);

  const [visitors, setVisitors] = useState(0);

  const [form] = Form.useForm();

  const AboutUsStyle = {
    marginTop: "2vh",
  };

  const updateUserCount = async () => {
    try {
      const response = await axios.post(`${BASEURL}/visitors/log-visitor`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getVisitors = async () => {
    try {
      const response = await axios.get(`${BASEURL}/visitors/visitor-count`);
      console.log(response);
      setVisitors(response?.data?.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateUserCount();
    getVisitors();
  }, []);

  const manageRegistration = async (values: any) => {
    try {
      const response = await axios.post(`${BASEURL}/user/create_user`, values);
      if (response?.status === 200) {
        message.success("Added user SuccessFully");
        setLoginModal(false);
        setLoginOrRegister(!loginOrRegister);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to create Agent");
    }
  };

  const manageLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASEURL}/otp/send-otp?phone_number=${values?.phone_number}`
      );
      console.log(response);
      setCurrentPhoneNumber(values?.phone_number);
      setEnterOtp(true);
    } catch (error: any) {
      console.error(error);
      if (error?.status === 404) {
        message.warning("user not registered please register before login");
        form.resetFields();
        setLoginOrRegister(!loginOrRegister);
      } else {
        setEnterOtp(true);
        setCurrentPhoneNumber(values?.phone_number);
        message.error("Unable to send OTP please check the phone number");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values: any) => {
    if (loginOrRegister) {
      manageRegistration(values);
    } else {
      manageLogin(values);
    }
  };

  const handleOtpSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        `${BASEURL}/otp/verify-otp?phone_number=${currentPHoneNumber}&otp=${values?.otp}`
      );
      console.log(response);

      if (response?.status === 200) {
        message.success("Login Success");
        setLoginModal(false);
        form.resetFields();
        Cookies.set("userRole", response?.data?.role, { expires: 1 });
        Cookies.set("userToken", response?.data?.access_token, { expires: 1 });
        if (response?.data?.role !== "User") {
          navigate("/admin");
        } else if (response?.data?.role === "User") {
          navigate("/pages");
        }
        setEnterOtp(!enterOtp);
      }
    } catch (error: any) {
      console.error(error);
      if (
        error?.status === 404 &&
        error?.response?.data?.detail ===
          "Phone number not found in any user tables"
      ) {
        message.warning("user not registered");
        form.resetFields();
        setLoginOrRegister(!loginOrRegister);
      } else {
        setEnterOtp(true);
        message.error("Unable Login please check the password and username");
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove("userRole");
    Cookies.remove("userToken");
    navigate("/");
    message.success("Logged out successfully");
  };

  const supportMenu = (
    <Menu
      style={{
        background: "linear-gradient(90.23deg, #0C2E37 0.2%, #000000 129.15%)",
      }}
    >
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
        >
          <p>Whatsapp Chat</p>
          <img src={whatsAppChatImg} height={"20%"} width={"20%"}></img>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row
      style={{
        lineHeight: "0",
      }}
      gutter={[20, 20]}
      justify={"space-around"}
    >
      <Col span={2}>
        <img src={logo} style={{ height: "100%", width: "100%" }} alt="Logo" />
      </Col>
      <Col
        className={styles.Hover}
        span={10}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "2rem",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => navigate("in-play")}
        >
          <img
            src={inplay}
            alt="Play Icon"
            style={{ width: "20px", marginRight: "0.5rem" }}
          />
          Play
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "2rem",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
          }}
          className={styles.Hover}
          onClick={() => navigate("/")}
        >
          <img
            src={Home}
            alt="Play Icon"
            style={{ width: "20px", marginRight: "0.5rem" }}
          />
          Home
        </div>
        {location.pathname !== "/admin" && (
          <div className={styles.searchBarWrapper}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchBar}
            />
            <SearchOutlined className="text-white text-2xl" />
          </div>
        )}

        <div className={styles.vistorStyles}>
          <p style={{ marginRight: "5px" }}>{visitors}</p>
          <p>Visitors</p>
        </div>
      </Col>
      <Col
        span={9}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        className={styles.Hover}
      >
        {location.pathname !== "/admin" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "2rem",
              color: "white",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            <Dropdown overlay={supportMenu} trigger={["click"]}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={whatsApp}
                  alt="Play Icon"
                  style={{ width: "20px", marginRight: "0.5rem" }}
                />
                Chat Support
              </div>
            </Dropdown>
          </div>
        )}{" "}
        {location.pathname !== "/admin" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "2rem",
              color: "white",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            <img
              src={call}
              alt="Play Icon"
              style={{ width: "15px", marginRight: "0.5rem" }}
            />
            Call Us
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "2rem",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => setIsOpen(true)}
        >
          <img
            src={AboutUS}
            alt="Play Icon"
            style={{ width: "20px", marginRight: "0.5rem" }}
          />
          About Us
        </div>
        <div>
          {location.pathname === "/admin" ? (
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button type="primary" onClick={() => setLoginModal(true)}>
              Login
            </Button>
          )}
        </div>
      </Col>
      <Modal
        open={isOpen}
        footer=""
        onClose={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <Card
          title={
            <Row
              justify={"center"}
              style={{ backgroundColor: "inherit", marginBottom: "2vh" }}
            >
              <img
                src={logo} // Replace with the actual path to your logo
                alt="Polo Games Logo"
                style={{ height: "50px" }}
              />
            </Row>
          }
        >
          <Row justify="center" style={{ color: "white" , fontFamily:"Popins" }}>
            <h1>Welcome to Polo.Game</h1>
            <p>
              Your ultimate destination for an exhilarating and secure online
              betting experience! At Polo.Game, we bring together the best in
              sports betting, innovative technology, and a user-friendly
              interface to provide an unparalleled gaming environment. Whether
              you're a seasoned bettor or a first-time player, our platform
              offers a variety of exciting betting options across numerous
              sports and events.
            </p>
            <p>
              We prioritize transparency, fairness, and security, ensuring that
              every wager you place is met with the highest standards of
              reliability. At Polo.Game, we believe in bringing the excitement
              of betting to you with a touch of class and reliability.
              Established in 2016, we are a UK-based betting website dedicated
              to providing a top-tier betting experience for all our customers.
              Whether you're a seasoned bettor or just starting, we have
              something for everyone.
            </p>

            <h3 style={AboutUsStyle}>Our Mission</h3>
            <p>
              Our mission is simple: to offer a safe, fair, and exhilarating
              betting environment. We strive to enhance your betting experience
              with an intuitive platform, extensive market options, and
              exceptional customer service.
            </p>

            <h3 style={AboutUsStyle}>What We Offer</h3>
            <ul>
              <li>
                <strong>Comprehensive Betting Markets:</strong> Polo.Game covers
                a wide range of sports and events from football and horse racing
                to casinos and beyond. We offer competitive odds and numerous
                betting options to suit all preferences.
              </li>
              <li>
                <strong>Live Betting:</strong> Enjoy the thrill of in-play
                betting with real-time updates and live odds. Our live betting
                platform ensures you never miss a moment of the action.
              </li>
              <li>
                <strong>Casino Games:</strong> For those who enjoy various
                games, our online casino features multiple slots, table games,
                and live dealer experiences. It's the perfect place to unwind
                and enjoy some leisure time.
              </li>
              <li>
                <strong>Promotions and Bonuses:</strong> We reward our customers
                with generous promotions and bonuses. From welcome offers to
                loyalty rewards, there's always something to boost your betting
                experience at Polo.Game.
              </li>
            </ul>

            <h3 style={AboutUsStyle}>Safety and Security</h3>
            <p>
              Your security is our top priority. Polo.Game operates under a
              strict regulatory framework set by the UK Gambling Commission,
              ensuring a fair and transparent betting environment.
            </p>

            <h3 style={AboutUsStyle}>Responsible Gambling</h3>
            <p>
              At Polo.Game, we promote responsible gambling. We provide tools
              and resources to help you stay in control, including
              self-exclusion options, deposit limits, and access to support
              organisations. Your well-being is important to us, and we are
              committed to providing a safe and enjoyable betting experience.
            </p>

            <h3 style={AboutUsStyle}>Customer Support</h3>
            <p>
              Our dedicated customer support team is available 24/7. Whether you
              have a question about your account, need help with a bet, or
              require technical assistance, we're just a click or a call away.
            </p>
          </Row>
        </Card>
      </Modal>
      <Modal
        open={loginModal}
        onClose={() => {
          setEnterOtp(false);
          setLoginModal(false);
        }}
        onCancel={() => {
          setEnterOtp(false);
          setLoginModal(false);
        }}
        footer={""}
      >
        <Card
          title={
            <Row
              justify={"center"}
              style={{ backgroundColor: "inherit", marginBottom: "2vh" }}
            >
              <img
                src={logo}
                alt="Polo Games Logo"
                style={{ height: "50px" }}
              />
            </Row>
          }
        >
          <Row justify={"center"} align={"bottom"}>
            {!loginOrRegister ? (
              <>
                {!enterOtp && (
                  <Spin spinning={loading}>
                    <Form
                      style={{ color: "white" }}
                      form={form}
                      onFinish={handleFormSubmit}
                    >
                      <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Enter Phone Number" />
                      </Form.Item>
                      <Row gutter={[20, 20]} justify={"space-between"}>
                        {true && (
                          <Button
                            type="primary"
                            onClick={() => setLoginModal(false)}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          style={{ backgroundColor: "#73d13d", color: "white" }}
                          type="default"
                          htmlType="submit"
                        >
                          Get OTP
                        </Button>
                      </Row>
                    </Form>
                  </Spin>
                )}

                {enterOtp && (
                  <Form
                    style={{ color: "white" }}
                    form={form}
                    onFinish={handleOtpSubmit}
                  >
                    <Form.Item
                      name="otp"
                      label="Enter OTP"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter your OTP" />
                    </Form.Item>
                    <Row gutter={[20, 20]} justify={"center"}>
                      <Button
                        style={{ backgroundColor: "#73d13d", color: "white" }}
                        type="default"
                        htmlType="submit"
                      >
                        Verify OTP
                      </Button>
                    </Row>
                  </Form>
                )}
              </>
            ) : (
              <>
                <Row>
                  <Form
                    style={{ color: "white" }}
                    form={form}
                    onFinish={handleFormSubmit}
                  >
                    <Form.Item
                      name="username"
                      label="User Name"
                      rules={[
                        { required: true, message: "User Name is required" },
                      ]}
                    >
                      <Input placeholder="Enter your username" />
                    </Form.Item>

                    <Row gutter={16}>
                      <Col span={10}>
                        <Form.Item
                          name="country_code"
                          label="Country Code"
                          rules={[
                            {
                              required: true,
                              message: "Country Code is required",
                            },
                            {
                              pattern: /^\+\d+$/,
                              message:
                                "Country Code must start with '+' followed by numbers",
                            },
                          ]}
                        >
                          <Input placeholder="+1" />
                        </Form.Item>
                      </Col>

                      <Col span={14}>
                        <Form.Item
                          name="phone_number"
                          label="Phone Number"
                          rules={[
                            {
                              required: true,
                              message: "Phone Number is required",
                            },
                            {
                              pattern: /^[0-9]{10,15}$/,
                              message:
                                "Phone Number must be 10 to 15 digits long",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Phone Number" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="selected_site"
                      label="Select Site"
                      rules={[{ required: true, message: "Site is required" }]}
                    >
                      <Select placeholder="Select a site">
                        <Select.Option value="bet365">
                          https://www.realsport9.com
                        </Select.Option>
                        <Select.Option value="betway">
                          https://www.skyexch.art{" "}
                        </Select.Option>
                        <Select.Option value="unibet">
                          https://world77.co
                        </Select.Option>
                        <Select.Option value="williamhill">
                          https://realsport247.com
                        </Select.Option>
                        <Select.Option value="paddypower">
                          https://tiger365.me/login
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Row gutter={[20, 20]} justify={"space-between"}>
                      <Button
                        type="primary"
                        onClick={() => setLoginModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{ backgroundColor: "#73d13d" }}
                        type="default"
                        htmlType="submit"
                      >
                        Register
                      </Button>
                    </Row>
                  </Form>
                </Row>
                <Row
                  justify={"center"}
                  style={{ fontFamily: "Poppins" }}
                  gutter={[16, 16]}
                >
                  <Col
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    span={24}
                  >
                    OR
                  </Col>
                  <Col
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    span={24}
                  >
                    Get Your Ready-Made ID From WhatsApp
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      onClick={() => {
                        const phoneNumber = "9333333330";
                        const message =
                          "Hello, I would like to connect with you!";
                        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                          message
                        )}`;
                        window.open(whatsappURL, "_blank");
                      }}
                      style={{
                        padding: "2vh",
                        borderRadius: "1rem",
                        height: "6vh",
                        width: "100%",
                        background:
                          "linear-gradient(90deg, #940101 0%, #4560FD 100%)",
                        color: "white",
                        fontFamily: "Poppins",
                      }}
                      icon={<WhatsApp></WhatsApp>}
                    >
                      WhatsApp Now
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Row>
          {/* <Row justify={"center"} align={"middle"} style={{ marginTop: "2vh" }}>
            {loginOrRegister ? (
              <Row justify={"space-between"} align={"middle"}>
                <Button
                  type="primary"
                  style={{
                    color: "white !important",
                    background: "rgba(12, 46, 55, 1)",
                    border: "1px solid black",
                    borderRadius: "1vh",
                  }}
                  onClick={() => setLoginOrRegister(false)}
                >
                  Already have an account?
                </Button>
                <img
                  src={whatsApp}
                  alt="WhatsApp"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const phoneNumber = "7992476139";
                    const message = "Hello, I would like to connect with you!";
                    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappURL, "_blank");
                  }}
                />
              </Row>
            ) : (
              <>
                <Button
                  type="primary"
                  style={{
                    color: "white !important",
                    background: "rgba(12, 46, 55, 1)",
                    border: "1px solid black",
                    borderRadius: "1vh",
                  }}
                  onClick={() => setLoginOrRegister(true)}
                >
                  Don't have a account
                </Button>
              </>
            )}
          </Row> */}
        </Card>
      </Modal>
    </Row>
  );
};

export default HeaderComponent;
