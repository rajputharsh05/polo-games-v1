import { HomeOutlined, PlayCircleOutlined, TrophyOutlined, SmileOutlined } from "@ant-design/icons";
import styles from "./footer.module.scss"
import { useNavigate } from "react-router-dom";


const DynamincFooter = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <div className={styles.footer_item}>
        <HomeOutlined className={styles.footer_icon} />
        <span>Home</span>
      </div>
      <div className={styles.footer_item}>
        <PlayCircleOutlined className={styles.footer_icon} />
        <span>In Play</span>
      </div>
      <div onClick={() => {
        navigate("/")
      }} className={`${styles.footer_item} ${styles.top_icon}`}>
        <HomeOutlined className={styles.footer_icon} />
      </div>
      <div className={styles.footer_item}>
        <TrophyOutlined className={styles.footer_icon} />
        <span>Aviator</span>
      </div>
      <div className={styles.footer_item}>
        <SmileOutlined className={styles.footer_icon} />
        <span>Casino</span>
      </div>
    </div>
  );
};

export default DynamincFooter;
