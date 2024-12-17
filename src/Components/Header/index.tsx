import {Col, Row} from "antd";
import styles from "./header.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.svg";
import {SearchOutlined } from "@ant-design/icons";
import inplay from "../../assets/inplay.png"
import Home from "../../assets/Home.png"
import whatsApp from "../../assets/whatsapp.png"
import call from "../../assets/call.png"
import AboutUS from "../../assets/about us.png"
//import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {


  //const navigate = useNavigate();

  return (
    <Row style={{ background: "rgba(12, 46, 55, 1)", lineHeight: "0", }} gutter={[20, 20]} justify={"space-between"}>
      <Col span={2}>
        <img src={logo} alt="Logo" />
      </Col>
      <Col span={10} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "2rem",
            color: "white",
            fontSize: "16px",
            fontWeight: '500',
          }}
        >
          <img
            src={inplay}
            alt="Play Icon"
            style={{ width: "24px", marginRight: "0.5rem" }}
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
            fontWeight: '500',
          }}
        >
          <img
            src={Home}
            alt="Play Icon"
            style={{ width: "24px", marginRight: "0.5rem" }}
          />
          Home
        </div>
        <div

          className={styles.searchBarWrapper}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchBar}
          />
          <SearchOutlined className="text-white text-2xl" />
        </div>

        <div className={styles.vistorStyles}>
          <p>
            2,22,323
          </p>
          <p>
            Visitors
          </p>
        </div>
      </Col>
      <Col span={9} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "2rem",
            color: "white",
            fontSize: "16px",
            fontWeight: '500',
          }}
        >
          <img
            src={whatsApp}
            alt="Play Icon"
            style={{ width: "24px", marginRight: "0.5rem" }}
          />
          Chat Support
        </div> <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "2rem",
            color: "white",
            fontSize: "16px",
            fontWeight: '500',
          }}
        >
          <img
            src={call}
            alt="Play Icon"
            style={{ width: "20px", marginRight: "0.5rem" }}
          />
          Call Us
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "2rem",
            color: "white",
            fontSize: "16px",
            fontWeight: '500',
          }}
        >
          <img
            src={AboutUS}
            alt="Play Icon"
            style={{ width: "24px", marginRight: "0.5rem" }}
          />
          About Us
        </div>
      </Col>
    </Row>
  );
};

export default HeaderComponent;
