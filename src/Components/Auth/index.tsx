import styles from "./auth.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.svg";
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
import { KeySharp } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { BASEURL } from "../../utils/apis";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [isOtp, setIsOtp] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const manageLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASEURL}/otp/send-otp?phone_number=${values?.mobileNumber}`
      );
      console.log(response);
      setPhoneNumber(values?.mobileNumber);
      setIsOtp(true);
    } catch (error: any) {
      console.error(error);
      if (error?.status === 404) {
        message.warning("user not registered please register before login");
        setIsOpenModal(true);
      } else {
        setPhoneNumber(values?.mobileNumber);
        setIsOtp(true);
        message.error("Unable to send OTP please check the phone number");
      }
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        `${BASEURL}/otp/verify-otp?phone_number=${phoneNumber}&otp=${values?.mobileNumber}`
      );
      console.log(response);

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


  const onFinish = (values: any) => {
    if(!isOtp){
      manageLogin(values);
    }else{
      handleOtpSubmit(values);
    }
    console.log("Form Values:", values);
  };

  const handleFormSubmit = async ( values : any) => {
    try {
          const response = await axios.post(
            `${BASEURL}/user/create_user`,
            values
          );
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
            POLO GAMES !!!
          </Col>
        }
      </Row>
      <Spin spinning={loading}>
        {isLoginPage ? (
          <Row justify={"center"}>
            {}
            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: "1vh" }}
            >
              <Form.Item
                name="mobileNumber"
                label={isOtp ? "Please Enter the OTP" : "Please Enter Phone Number"}
                rules={[
                  {
                    required: true,
                    message: isOtp ? "Please Enter OTP" : "Please enter your mobile number!",
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
                  placeholder= { isOtp ? "Enter OTP" : "Enter Mobile Number"}
                  style={{
                    borderRadius: 24,
                    fontSize: 16,
                    backgroundColor: "white",
                  }}
                />
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
                  {
                    isOtp ? "Verify OTP" : "Generate OTP"
                  }
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
          <Row style={{padding:"4vh"}}>
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
      </Spin>
      <Row
        justify={"space-between"}
        align={"middle"}
        style={{ marginTop: "3vh" }}
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
    </div>
  );
};

export default Auth;
