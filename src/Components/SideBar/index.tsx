import { Layout, Menu } from "antd";
import {
  PlayCircleOutlined,
  TrophyOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import styles from "./sidebar.module.scss";


const { Sider } = Layout;

const SideBar = () => {
  const menuItems: any = [
    {
      key: "in-play",
      icon: <PlayCircleOutlined />, // Replace with correct icon
      label: "In Play",
    },
    {
      key: "cricket",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Cricket",
    },
    {
      key: "tennis",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Tennis",
    },
    {
      key: "soccer",
      icon: <RadarChartOutlined />, // Replace with correct icon
      label: "Soccer",
    },
    {
      key: "horse-racing",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Horse Racing",
    },
    {
      key: "rugby-union",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Rugby Union",
    },
    {
      key: "golf",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Golf",
    },
    {
      key: "esports",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Esports",
    },
    {
      key: "mma",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "MMA",
    },
    {
      key: "gaelic-games",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Gaelic Games",
    },
    {
      key: "volleyball",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Volleyball",
    },
    {
      key: "handball",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Handball",
    },
    {
      key: "australian-rules",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Australian Rules",
    },
    {
      key: "ice-hockey",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Ice Hockey",
    },
    {
      key: "snooker",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Snooker",
    },
    {
      key: "darts",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Darts",
    },
    {
      key: "cycling",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Cycling",
    },
    {
      key: "special-bets",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Special Bets",
    },
    {
      key: "table-tennis",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Table Tennis",
    },
  ];
  

  return (
    <Sider
      style={{
        background: 'linear-gradient(180deg, #0C2E37 -16.64%, #000000 100%)',
        padding:"1vh"
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["home"]}
        defaultOpenKeys={[]}
        items={menuItems}
        className={styles.sidebarMenu}
      />
    </Sider>
  );
};

export default SideBar;
