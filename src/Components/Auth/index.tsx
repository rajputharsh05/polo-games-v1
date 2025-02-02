import styles from "./auth.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.png";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";
import safe from "../../assets/100_safe.png";
import protectedIcon from "../../assets/protected.png";
import plue from "../../assets/18_.png";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Code, KeySharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = () => {
  const footerIcons = [
    {
      label: "18+ only",
      icon: plue,
    },
    {
      label: "DMCA Protected",
      icon: protectedIcon,
    },
    {
      label: "100% secure",
      icon: safe,
    },
  ];
  const BASEURL = import.meta.env.VITE_BASEURL;

  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [countryCode, setCountryCode] = useState<any>();
  const [isOtp, setIsOtp] = useState<boolean>();
  const [otpModal, setOtpModal] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [Otpform] = Form.useForm();
  const navigate = useNavigate();
  const AUTH = useSelector((state: any) => state?.auth);

  useEffect(() => {
    if (AUTH?.logIn) {
      navigate("/pages");
    }
  }, []);

  const manageLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASEURL}/otp/send-otp?phone_number=${values?.phone_number}&country_code=${values?.country_code}`
      );
      if (response?.status === 200) {
        setPhoneNumber(values?.phone_number);
        setCountryCode(values?.country_code);
        message.success("OTP sent successfully");
        setOtpModal(true);
      }
    } catch (error: any) {
      console.error(error);
      message.error("Unable to send OTP please check the phone number");
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        `${BASEURL}/otp/verify-otp?phone_number=${phoneNumber}&otp=${values?.otp}&country_code=${countryCode}`
      );

      if (response?.status === 200) {
        message.success("Login Success");
        form.resetFields();
        Cookies.set("userRole", response?.data?.role, { expires: 1 });
        Cookies.set("userToken", response?.data?.access_token, { expires: 1 });
        if (response?.data?.role !== "User") {
          navigate("/admin");
        } else if (response?.data?.role === "User") {
          navigate("/pages");
        }
        setIsOtp(!isOtp);
      }
    } catch (error: any) {
      console.error(error);
      message.error("Unable Login please check the password and username");
    }
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${BASEURL}/user/create_user`, values);
      if (response?.status === 200) {
        message.success("Added user SuccessFully");
        setIsLoginPage(!isLoginPage);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to create Agent");
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.logoWrapper}>
        <img src={logo}></img>
      </div>

      <Row className={styles.textWrapper}>
        <Col className={styles.textStyle} span={24}>
          Welcome
          {isLoginPage ? " Back !!!" : " To"}
        </Col>
        {
          <Col className={styles.textStyle} span={24}>
            POLO GAME !!!
          </Col>
        }
      </Row>
      <Spin spinning={loading}>
        {isLoginPage ? (
          <Row justify={"center"}>
            {}
            <Form
              layout="vertical"
              form={form}
              onFinish={manageLogin}
              style={{ marginTop: "1vh" }}
            >
              <Row justify={"space-between"}>
                <Col span={6}>
                  <Form.Item
                    name="country_code"
                    label={"code"}
                    rules={[
                      {
                        required: true,
                        message: "country code is required",
                      },
                    ]}
                    style={{
                      fontFamily: "Popines",
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                  >
                    <Input
                      prefix={<Code />}
                      placeholder={"+91"}
                      style={{
                        borderRadius: 24,
                        fontSize: 16,
                        backgroundColor: "white",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name="phone_number"
                    label={"Please Enter Phone Number"}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mobile number!",
                      },
                    ]}
                    style={{
                      fontFamily: "Popines",
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                  >
                    <Input
                      prefix={<KeySharp />}
                      placeholder={isOtp ? "Enter OTP" : "Enter Mobile Number"}
                      style={{
                        borderRadius: 24,
                        fontSize: 16,
                        backgroundColor: "white",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"end"}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "50%",
                    borderRadius: 24,
                    fontSize: 16,
                    marginBottom: 7,
                    backgroundColor: "black",
                    fontFamily: "Popines",
                    boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.23)",
                  }}
                >
                  {"Generate OTP"}
                </Button>
              </Row>

              <div style={{ marginTop: "2vh" }}>
                {/* Label */}
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "white", // Customize the color of the label
                    fontFamily: "Popines",
                  }}
                >
                  Direct Login
                </label>

                <Button
                  type="default"
                  htmlType="button"
                  icon={<WhatsAppOutlined />}
                  onClick={() => {
                    const phoneNumber = "9333333330";
                    const message = "Hello, I would like to connect with you!";
                    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappURL, "_blank");
                  }}
                  style={{
                    width: "100%",
                    borderRadius: 24,
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: "600",
                    backgroundColor: "white",
                    fontFamily: "Popines",
                    height: "4vh",
                    // background: "linear-gradient(90deg, #940101 0%, #4560FD 100%)",
                    color: "black",
                  }}
                >
                  Get ID from WhatsApp?
                </Button>
              </div>
            </Form>
          </Row>
        ) : (
          <Row style={{ padding: "4vh" }}>
            <Form
              style={{ color: "white" }}
              form={form}
              onFinish={handleFormSubmit}
            >
              <Form.Item
                name="username"
                label="User Name"
                rules={[{ required: true, message: "User Name is required" }]}
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
                        message: "Phone Number must be 10 to 15 digits long",
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

              <Row justify={"end"}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "50%",
                    borderRadius: 24,
                    fontSize: 16,
                    marginBottom: 7,
                    backgroundColor: "black",
                    fontFamily: "Popines",
                    boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.23)",
                  }}
                >
                  Register
                </Button>
              </Row>
            </Form>
          </Row>
        )}
        <Row
          justify={"center"}
          style={{ color: "white", fontFamily: "Popins", marginTop: "2vh" }}
        >
          <p>
            {isLoginPage
              ? "Don't have an account ?"
              : "Already have an account ?"}{" "}
            <span
              onClick={() => {
                setIsLoginPage(!isLoginPage);
              }}
              style={{
                color: "#940101",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {isLoginPage ? "Register" : "Login"}
            </span>
          </p>
        </Row>
      </Spin>
      <Row
        justify={"space-between"}
        align={"middle"}
        style={{ marginTop: "3vh", marginBottom: "5vh" }}
      >
        {footerIcons?.map((icon, index) => (
          <Col key={index} span={8} className={styles.footerIcon}>
            <img src={icon.icon} alt={icon.label}></img>
            <p>{icon.label}</p>
          </Col>
        ))}
      </Row>
      <Modal
        open={isModalOpen}
        onClose={() => setIsOpenModal(false)}
        onCancel={() => setIsOpenModal(false)}
        onOk={() => {
          setIsLoginPage(false);
          setIsOpenModal(false);
        }}
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
          <Row
            style={{ fontFamily: "Popines", color: "white" }}
            justify={"center"}
            align={"middle"}
          >
            You have not yet registered , Please confirm if you want to register
            ?
          </Row>
        </Card>
      </Modal>
      <Modal
        open={otpModal}
        onClose={() => setOtpModal(false)}
        onCancel={() => setOtpModal(false)}
        footer={null}
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
          <Row
            style={{ fontFamily: "Popines", color: "white" }}
            justify={"center"}
            align={"middle"}
          >
            <Form
              style={{ color: "white" }}
              form={Otpform}
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
          </Row>
        </Card>
      </Modal>
    </div>
  );
};

export default Auth;
