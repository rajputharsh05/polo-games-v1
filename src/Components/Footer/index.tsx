import { Row, Col, Divider, Typography, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./newFooter.module.scss";

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      {/* Title Section */}
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Typography.Title level={4} style={{ color: "#fff" }}>
          24X7 Support
        </Typography.Title>
      </Row>

      <Divider variant="dashed" className={styles.dashedStyle} />

      {/* Links Section */}
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={16} lg={12}>
          <Space
            size="large"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography.Link
              style={{
                color: "#fff",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              href="#"
            >
              About us
            </Typography.Link>
            <Typography.Link
              style={{
                color: "#fff",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              href="#"
            >
              Terms and Conditions
            </Typography.Link>
            <Typography.Link
              style={{
                color: "#fff",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              href="#"
            >
              KYC Policy
            </Typography.Link>
            <Typography.Link
              style={{
                color: "#fff",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              href="#"
            >
              Responsible Gaming
            </Typography.Link>
          </Space>
        </Col>
      </Row>

      <Divider variant="dashed" className={styles.dashedStyle} />

      {/* Safety Section */}
      <Row justify="center" align="middle" style={{ marginBottom: "20px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
          <span style={{ marginLeft: "10px", fontSize: "16px" }}>
            100% SAFE - Protected connection and encrypted data
          </span>
        </Col>
      </Row>

      <Divider variant="dashed" className={styles.dashedStyle} />

      {/* Copyright Section */}
      <Row justify="center">
        <Typography.Text style={{ color: "#fff" }}>
          © Copyright 2024. All Rights Reserved.
        </Typography.Text>
      </Row>
    </div>
  );
};

export default Footer;
