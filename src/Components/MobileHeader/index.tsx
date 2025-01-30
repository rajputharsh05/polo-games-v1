import styles from "./mobileHeader.module.scss";
import img from "../../assets/Polo_Logo_Png[1] 1.png";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoutIMG from "../../assets/Logout.png";
import { logout } from "../../Redux/AuthSlice";
import Cookies from "js-cookie";
import { message } from "antd";

const MobileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AUTH = useSelector((state: any) => state?.auth);


  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("userRole");
    Cookies.remove("userToken");
    navigate("/");
    message.success("Logged out successfully");
  };
 
  return (
    <div style={{ lineHeight: "0px !important" }}>
      <div className={styles.headerWrapper}>
        <img className={styles.img} src={img} alt="Center Logo" />
        {AUTH?.logIn ? (
          <img
            src={logoutIMG}
            alt="Login"
            onClick={handleLogout}
            style={{
              height: "30px",
              boxShadow:
                "0 4px 6px rgba(255, 255, 255, 0.4), 0 1px 3px rgba(255, 255, 255, 0.3)",
              borderRadius: "1rem",
            }}
            className={styles.rightImage}
          />
        ) : (
          <img
            src="./images/login-image.png"
            alt="Login"
            onClick={() => navigate("/auth")}
            style={{
              height: "30px",
              boxShadow:
                "0 4px 6px rgba(255, 255, 255, 0.4), 0 1px 3px rgba(255, 255, 255, 0.3)",
              borderRadius: "1rem",
            }}
            className={styles.rightImage}
          />
        )}
      </div>
      <TopBar />
    </div>
  );
};

export default MobileHeader;
