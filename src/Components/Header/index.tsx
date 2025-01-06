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
} from "antd";
import styles from "./header.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.svg";
import { SearchOutlined } from "@ant-design/icons";
import inplay from "../../assets/inplay.png";
import Home from "../../assets/Home.png";
import whatsApp from "../../assets/whatsapp.png";
import AboutUS from "../../assets/about us.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import call from "../../assets/call.png";
import onlineChatImg from "../../assets/cryptocurrency-color_chat.png";
import whatsAppChatImg from "../../assets/logos_whatsapp-icon.png";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const [loginModal, setLoginModal] = useState(false);

  const [enterOtp, setEnterOtp] = useState(false);

  const [loginOrRegister, setLoginOrRegister] = useState(false);

  const [currentPHoneNumber, setCurrentPhoneNumber] = useState<number>();

  const [form] = Form.useForm();

  const manageRegistration = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/create_user",
        values
      );
      if (response?.status === 200) {
        message.success("Added user SuccessFully");
        setLoginModal(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to create Agent");
    }
  };

  const manageLogin = async (values: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/otp/send-otp?phone_number=${values?.phone_number}`
      );
      console.log(response)
      setCurrentPhoneNumber(values?.phone_number)
      setEnterOtp(true);
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
        setCurrentPhoneNumber(values?.phone_number)
        message.error("Unable Login please check the password and username");
      }
    }
  };

  const handleFormSubmit = async (values: any) => {
    if (loginOrRegister) {
      manageRegistration(values);
    } else {
      manageLogin(values);
    }
  };

  const handleOtpSubmit = async (values : any) => {
    console.log(currentPHoneNumber)
    console.log(values?.otp)
    try {
      const response = await axios.post(
        `http://localhost:8000/otp/verify-otp?phone_number=${currentPHoneNumber}&otp=${values?.otp}`
      );
      console.log(response)
      setEnterOtp(true);
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
        >
          <p>Whatsapp Chat</p>
          <img src={whatsAppChatImg} height={"20%"} width={"20%"}></img>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row
      style={{ background: "rgba(12, 46, 55, 1)", lineHeight: "0" }}
      gutter={[20, 20]}
      justify={"space-around"}
    >
      <Col span={2}>
        <img src={logo} alt="Logo" />
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
          <p style={{ marginRight: "5px" }}>3</p>
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
          <Button type="primary" onClick={() => setLoginModal(true)}>
            Login
          </Button>
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
          <Row justify={"center"} style={{ color: "white" }}>
            World's Best Gaming Site
          </Row>
        </Card>
      </Modal>
      <Modal
        open={loginModal}
        onClose={() => setLoginModal(false)}
        onCancel={() => setLoginModal(false)}
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
                      <Input placeholder="Enter Phone Number" />
                    </Form.Item>
                    <Row gutter={[20, 20]} justify={"space-between"}>
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
                <Form
                  style={{ color: "white" }}
                  form={form}
                  onFinish={handleFormSubmit}
                >
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
                    <Input placeholder="Enter Phone Number" />
                  </Form.Item>
                  <Form.Item
                    name="country_code"
                    label="Country Code"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter Country Code" />
                  </Form.Item>

                  <Form.Item
                    name="selected_site"
                    label="Enter Site"
                    rules={[{ required: true, type: "string" }]}
                  >
                    <Input placeholder="Enter Site" />
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
                      style={{ backgroundColor: "#73d13d" }}
                      type="default"
                      htmlType="submit"
                    >
                      Register
                    </Button>
                  </Row>
                </Form>
              </>
            )}
          </Row>
          <Row justify={"center"} align={"middle"} style={{ marginTop: "2vh" }}>
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
          </Row>
        </Card>
      </Modal>
    </Row>
  );
};

export default HeaderComponent;
