import styles from "./auth.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.svg";
import { Button, Col, Form, Input, Row } from "antd";
import safe from "../../assets/100_safe.png";
import protectedIcon from "../../assets/protected.png";
import plue from "../../assets/18_.png";
import { WhatsAppOutlined } from "@ant-design/icons";
import { KeySharp } from "@mui/icons-material";

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

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.logoWrapper}>
        <img src={logo}></img>
      </div>
      <Row className={styles.textWrapper}>
        <Col className={styles.textStyle} span={24}>
          Welcome To
        </Col>
        <Col className={styles.textStyle} span={24}>
          POLO GAMES !!!
        </Col>
      </Row>
      <Row justify={"center"}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: "1vh" }}
        >
          <Form.Item
            name="mobileNumber"
            label="Login with Mobile Number"
            rules={[
              { required: true, message: "Please enter your mobile number!" },
            ]}
            style={{
              fontFamily: "Popines",
              fontSize: "10px",
              fontWeight: "600",
            }}
          >
            <Input
              prefix={<KeySharp />}
              placeholder="Enter Mobile Number"
              style={{
                borderRadius: 24,
                fontSize: 16,
                backgroundColor: "white",
              }}
            />
          </Form.Item>
          {/* Generate OTP Button */}
          <Row justify={"end"}>
            <Button
              type="primary"
              htmlType="button"
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
              Generate OTP
            </Button>
          </Row>
          {/* OTP Input */}

          

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
              icon={<WhatsAppOutlined  />}
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
                backgroundColor:"white",
                fontFamily: "Popines",
                // background: "linear-gradient(90deg, #940101 0%, #4560FD 100%)",
                color: "black",
              }}
            >
              Get ID from WhatsApp?
            </Button>
          </div>

          {/* Login Button */}
        </Form>
      </Row>
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
    </div>
  );
};

export default Auth;
