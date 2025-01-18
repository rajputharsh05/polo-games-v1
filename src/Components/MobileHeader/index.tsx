import styles from "./mobileHeader.module.scss";
import img from "../../assets/Polo_Logo_Png[1] 1.png";
import TopBar from "../TopBar";

const MobileHeader = () => {
  return (
    <div style={{lineHeight:"0px !important"}}>
      <div className={styles.headerWrapper}>
        <img src={img}></img>
      </div>
      <TopBar></TopBar>
    </div>
  );
};

export default MobileHeader;
