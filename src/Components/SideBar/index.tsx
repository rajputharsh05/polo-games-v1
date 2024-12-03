import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import styles from "./sidebar.module.scss";


const { Sider } = Layout;

const SideBar = () => {
  const menuItems: any = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "in-play",
      icon: <PlayCircleOutlined />,
      label: "In Play",
    },
    {
      key: "separator",
      type: "group",
      label: (
        <div
          style={{
            height: "1px",
            background: "#dcdcdc",
            margin: "1px 0",
          }}
        />
      ),
    },
    {
      key: "cricket",
      icon: <TrophyOutlined />,
      label: "Cricket",
      children: [
        { key: "cricket-odi", label: "One Day Internationals" },
        { key: "cricket-t20", label: "Women’s International Twenty20 Matches" },
        { key: "cricket-t10", label: "Abu Dhabi T10" },
        { key: "cricket-league", label: "Global Super League T20" },
      ],
    },
    {
      key: "soccer",
      icon: <RadarChartOutlined />,
      label: "Soccer",
      children: [
        { key: "soccer-premier", label: "Premier League" },
        { key: "soccer-champions", label: "Champions League" },
        { key: "soccer-worldcup", label: "World Cup" },
      ],
    },
    {
      key: "tennis",
      icon: <RadarChartOutlined />,
      label: "Tennis",
      children: [
        { key: "tennis-grand-slam", label: "Grand Slam" },
        { key: "tennis-atp", label: "ATP Tours" },
        { key: "tennis-wta", label: "WTA Tours" },
      ],
    },
    {
      key: "horse-racing",
      icon: <TrophyOutlined />,
      label: "Horse Racing",
      children: [
        { key: "horse-racing-local", label: "Local Races" },
        { key: "horse-racing-international", label: "International Races" },
      ],
    },
  ];

  return (
    <Sider
      style={{
        background: "#333",
        borderRight: "1px solid #dcdcdc",
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
