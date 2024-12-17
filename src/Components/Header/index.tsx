import { Button, Col, Row, Tabs } from "antd";
import styles from "./header.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.svg";
import { HomeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useNavigate } from "react-router-dom";
const HeaderComponent = () => {


  const tabItems = [
    {
      label: (
        <span style={{ fontSize: "16px" }}>
          <HomeOutlined style={{ marginRight: "1vw" }} />
          Home
        </span>
      ),
      key: "home",
    },
    {
      label: (
        <span style={{ fontSize: "16px" }}>
          <PlayCircleOutlined style={{ marginRight: "1vw" }} />
          In Play
        </span>
      ),
      key: "in-play",

    },
    {
      label: (
        <span style={{ fontSize: "16px" }}>
          <SportsCricketIcon style={{ marginRight: "1vw", height:"3vh" }} />
          Cricket
        </span>
      ),
      key: "cricket",
    },
    {
      label: (
        <span style={{ fontSize: "16px" }}>
          <SportsSoccerIcon style={{ marginRight: "1vw" , height:"3vh" }} />
          Soccer
        </span>
      ),
      key: "Soccer",
    },
    {
      label: (
        <span style={{ fontSize: "16px" }}>
          <SportsTennisIcon style={{ marginRight: "1vw" , height:"3vh"}} />
          Tennis
        </span>
      ),
      key: "Tennis",
    },

  ];

  const navigate = useNavigate();

  return (
    <Row style={{ background: "rgba(12, 46, 55, 1)", lineHeight: "0", }} gutter={[20,20]}>
      <Col span={7}>
        <img src={logo} alt="Logo" />
      </Col>
      <Col span={10}>
        <div style={{ background: "rgba(12, 46, 55, 1)", color: "gray" }}>
          <Tabs
            defaultActiveKey="home"
            items={tabItems}
            tabBarStyle={{
              borderBottom: 'none',
              fontSize: "20px"
            }}
            onChange={(ele)=>{
                navigate(`/${ele}`)
            }}
            className={styles.custom_tabs}
          />
        </div>
      </Col>
      <Col span={7}>
        <Row justify="end" style={{marginTop:"3vh"}}>
            <Button type="primary">Login</Button>
        </Row>
      </Col>
    </Row>
  );
};

export default HeaderComponent;
