import { Layout, Menu } from "antd";
import styles from "./sidebar.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

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
      icon: <Icon icon="heroicons:play" width="24" height="24" />,
      label: (
        <div className={styles.menuItem}>
          <span>In Play</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.marker}>.</div>
              <div className={styles.LiveCircle}></div>
              <div className={styles.marker}>.</div>
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
      icon: <Icon icon="mdi:cricket" width="24" height="24" />,
      label: (
        <div className={styles.menuItem}>
          <span>Cricket</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.marker}>.</div>
              <div className={styles.LiveCircle}></div>
              <div className={styles.marker}>.</div>
            </div>
            <div className={styles.LiveSectionSecond}>{cricket}</div>
          </div>
        </div>
      ),
    },
    {
      key: "soccer",
      icon: <Icon icon="fluent-mdl2:soccer" width="24" height="24" />,
      label: (
        <div className={styles.menuItem}>
          <span>Soccer</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.marker}>.</div>
              <div className={styles.LiveCircle}></div>
              <div className={styles.marker}>.</div>
            </div>
            <div className={styles.LiveSectionSecond}>{soccer}</div>
          </div>
        </div>
      ),
    },
    {
      key: "tennis",
      icon: <Icon icon="solar:tennis-bold-duotone" width="24" height="24" />,
      label: (
        <div className={styles.menuItem}>
          <span>Tennis</span>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.marker}>.</div>
              <div className={styles.LiveCircle}></div>
              <div className={styles.marker}>.</div>
            </div>
            <div className={styles.LiveSectionSecond}>{tennis}</div>
          </div>
        </div>
      ),
    },
    {
      key: "horse-racing",
      icon: <Icon icon="la:horse-head" width="24" height="24" />,
      label: "Horse Racing",
    },
    {
      key: "rugby-union",
      icon: <Icon icon="mdi:rugby" width="24" height="24" />,
      label: "Rugby Union",
    },
    {
      key: "golf",
      icon: <Icon icon="ph:golf-light" width="24" height="24" />,
      label: "Golf",
    },
    {
      key: "esports",
      icon: <Icon icon="streamline:esports" width="24" height="24" />,
      label: "Esports",
    },
    {
      key: "mma",
      icon: (
        <Icon
          icon="material-symbols-light:sports-mma-outline"
          width="24"
          height="24"
        />
      ),
      label: "MMA",
    },
    {
      key: "gaelic-games",
      icon: <Icon icon="arcticons:puzzel-cc" width="24" height="24" />,
      label: "Gaelic Games",
    },
    {
      key: "volleyball",
      icon: <Icon icon="solar:volleyball-broken" width="24" height="24" />,
      label: "Volleyball",
    },
    {
      key: "handball",
      icon: <Icon icon="mdi:handball" width="24" height="24" />,
      label: "Handball",
    },
    {
      key: "australian-rules",
      icon: <Icon icon="fluent-mdl2:australian-rules" width="24" height="24" />,
      label: "Australian Rules",
    },
    {
      key: "ice-hockey",
      icon: <Icon icon="hugeicons:ice-hockey" width="24" height="24" />,
      label: "Ice Hockey",
    },
    {
      key: "snooker",
      icon: <Icon icon="mdi:snooker-rack" width="24" height="24" />,
      label: "Snooker",
    },
    {
      key: "darts",
      icon: <Icon icon="arcticons:pro-darts" width="24" height="24" />,
      label: "Darts",
    },
    {
      key: "cycling",
      icon: <Icon icon="solar:bicycling-outline" width="24" height="24" />,
      label: "Cycling",
    },
    {
      key: "special-bets",
      icon: <Icon icon="token:bets" width="24" height="24" />,
      label: "Special Bets",
    },
    {
      key: "table-tennis",
      icon: <Icon icon="la:table-tennis" width="24" height="24" />,
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
