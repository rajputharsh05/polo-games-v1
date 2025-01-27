import { HomeOutlined, PlayCircleOutlined, TrophyOutlined, SmileOutlined } from "@ant-design/icons";
import styles from "./footer.module.scss"
import { useNavigate } from "react-router-dom";
import offers from "../../assets/offers.png"

const DynamincFooter = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/#target-section"); // Navigate to the page and section
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer_item} onClick={() => {
        navigate("/offers")
      }}>
        <img src={offers}  className={styles.footer_icon}></img>
        <span>Offers</span>
      </div>
      <div className={styles.footer_item}  onClick={() => {
        navigate("/in-play")
      }}>
        <PlayCircleOutlined className={styles.footer_icon} />
        <span>In Play</span>
      </div>
      <div onClick={() => {
        navigate("/")
      }} className={`${styles.footer_item} ${styles.top_icon}`}>
        <HomeOutlined className={styles.footer_icon} />
      </div>
      <div className={styles.footer_item} onClick={() => {navigate("/auth")}}>
        <TrophyOutlined className={styles.footer_icon} />
        <span>Aviator</span>
      </div>
      <div className={styles.footer_item} onClick={handleNavigation}>
        <SmileOutlined className={styles.footer_icon} />
        <span>Casino</span>
      </div>
    </div>
  );
};

export default DynamincFooter;
