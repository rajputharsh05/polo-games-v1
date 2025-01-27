import styles from "./mobileHeader.module.scss";
import img from "../../assets/Polo_Logo_Png[1] 1.png";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";

const MobileHeader = () => {

  const navigate = useNavigate();

  return (
    <div style={{ lineHeight: "0px !important" }}>
      <div className={styles.headerWrapper}>
        <img className={styles.img} src={img} alt="Center Logo" />
        <img
          onClick={() => {navigate("/auth")}}
          src="./images/login-image.png"
          alt="Login"
          className={styles.rightImage}
        />
      </div>
      <TopBar />
    </div>
  );
};

export default MobileHeader;
