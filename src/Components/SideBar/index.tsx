import { Layout, Menu } from "antd";
import {
  PlayCircleOutlined,
  TrophyOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import styles from "./sidebar.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Sider } = Layout;

const SideBar = () => {
  const navigation = useNavigate();
  const cricket = useSelector((state: any) => state?.match?.cricket); // Fix typo
  const tennis = useSelector((state: any) => state?.match?.tennis);
  const soccer = useSelector((state: any) => state?.match?.soccer);
  console.log(cricket);

  const menuItems: any = [
    {
      key: "in-play",
      icon: <PlayCircleOutlined />,
      label: (
        <div className={styles.menuItem}>
          <span>In Play</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.LiveCircle}></div>
            </div>
            <div className={styles.LiveSectionSecond}>
              {cricket + soccer + tennis}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "cricket",
      icon: <TrophyOutlined />,
      label: (
        <div className={styles.menuItem}>
          <span>Cricket</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.LiveCircle}></div>
            </div>
            <div className={styles.LiveSectionSecond}>{cricket}</div>
          </div>
        </div>
      ),
    },
    {
      key: "soccer",
      icon: <RadarChartOutlined />,
      label: (
        <div className={styles.menuItem}>
          <span>Soccer</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.LiveCircle}></div>
            </div>
            <div className={styles.LiveSectionSecond}>{soccer}</div>
          </div>
        </div>
      ),
    },
    {
      key: "tennis",
      icon: <TrophyOutlined />,
      label: (
        <div className={styles.menuItem}>
          <span>Tennis</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.LiveCircle}></div>
            </div>
            <div className={styles.LiveSectionSecond}>{tennis}</div>
          </div>
        </div>
      ),
    },
    {
      key: "horse-racing",
      icon: <TrophyOutlined />, // Replace with correct icon
      label: "Horse Racing",
    },
    {
      key: "rugby-union",
      icon: <TrophyOutlined />,
      label: "Rugby Union",
    },
    {
      key: "golf",
      icon: <TrophyOutlined />,
      label: "Golf",
    },
    {
      key: "esports",
      icon: <TrophyOutlined />,
      label: "Esports",
    },
    {
      key: "mma",
      icon: <TrophyOutlined />,
      label: "MMA",
    },
    {
      key: "gaelic-games",
      icon: <TrophyOutlined />,
      label: "Gaelic Games",
    },
    {
      key: "volleyball",
      icon: <TrophyOutlined />,
      label: "Volleyball",
    },
    {
      key: "handball",
      icon: <TrophyOutlined />,
      label: "Handball",
    },
    {
      key: "australian-rules",
      icon: <TrophyOutlined />,
      label: "Australian Rules",
    },
    {
      key: "ice-hockey",
      icon: <TrophyOutlined />,
      label: "Ice Hockey",
    },
    {
      key: "snooker",
      icon: <TrophyOutlined />,
      label: "Snooker",
    },
    {
      key: "darts",
      icon: <TrophyOutlined />,
      label: "Darts",
    },
    {
      key: "cycling",
      icon: <TrophyOutlined />,
      label: "Cycling",
    },
    {
      key: "special-bets",
      icon: <TrophyOutlined />,
      label: "Special Bets",
    },
    {
      key: "table-tennis",
      icon: <TrophyOutlined />,
      label: "Table Tennis",
    },
  ];

  const handleOnClick = (data: any) => {
    const res = [
      "in-play",
      "cricket",
      "tennis",
      "soccer",
      "horse-racing",
    ].findIndex((ele) => ele === data?.key);
    if (res != -1) {
      navigation(`/${data?.key}`);
    }
  };

  return (
    <Sider
      width={"20vw"}
      style={{
        background: "linear-gradient(180deg, #0C2E37 -16.64%, #000000 100%)",
        padding: "1vh",
        color: "white !important",
        width: "100%",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["home"]}
        defaultOpenKeys={[]}
        items={menuItems}
        onClick={handleOnClick}
        className={styles.sidebarMenu}
      />
    </Sider>
  );
};

export default SideBar;
