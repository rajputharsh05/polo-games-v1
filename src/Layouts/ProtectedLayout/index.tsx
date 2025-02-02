import { Layout, message, Spin } from "antd";
import { useLocation, useOutlet } from "react-router-dom";
import HeaderComponent from "../../Components/Header";
const { Content, Header } = Layout;
import styles from "../GlobalLayout/globalLayout.module.scss";
import { useEffect, useState } from "react";
import MobileHeader from "../../Components/MobileHeader";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../../Redux/AuthSlice";
import DynamincFooter from "../../Components/DynamicFooter";

const ProtectedLayout = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [beforePageLoad, setBeforePageLoad] = useState(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const userRole = Cookies.get("userRole");
    const userToken = Cookies.get("userToken");
    const userPermissions = Cookies.get("permissions");

    if (userRole && userToken) {
      try {
        let parsedPermissions = {};

        if (userPermissions) {
          try {
            parsedPermissions = JSON.parse(userPermissions);
          } catch (error) {
            console.error("Error parsing permissions:", error);
            parsedPermissions = {}; // Fallback to empty object
          }
        }

        dispatch(
          login({
            role: userRole,
            permissions: parsedPermissions,
            token: userToken,
          })
        );

        if (userRole !== "Admin" && userRole !== "Superadmin" && location.pathname === "/admin") {
          navigate("/");
          message.warning(
            "You don't have access to this page. Please login first with proper credentials."
          );
        }
        setBeforePageLoad(false);
      } catch (e) {
        console.error("Error:", e);
        setBeforePageLoad(false);
      }
    } else {
      navigate("/");
      setBeforePageLoad(false);
      dispatch(logout());
      message.warning(
        "You don't have access to this page. Please login first with proper credentials."
      );
    }

    return () => {
      setBeforePageLoad(false);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);
      console.log(windowWidth);

      if (currentWidth < 768) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Spin spinning={beforePageLoad} tip="Wait while we verify you...">
      <Layout
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "rgba(12, 46, 55, 1)",
        }}
      >
        <Header
          style={{
            position: "fixed",
            top: 0,
            width: "100vw",
            zIndex: 1000,
            height: "8vh",
            padding: "0px 0px",
            lineHeight: "17px",
            backgroundColor: "inherit",
          }}
        >
          {isSidebarVisible ? (
            <HeaderComponent></HeaderComponent>
          ) : (
            <>
              <MobileHeader></MobileHeader>
            </>
          )}
        </Header>
        <Layout
          style={
            location.pathname !== "/auth"
              ? {
                  marginTop: windowWidth < 390 ? "12vh" : "10vh",
                  background:
                    "linear-gradient(90.23deg, #0C2E37 0.2%, #000000 129.15%)",
                }
              : { background: "rgba(12, 46, 55, 1)" }
          }
        >
          <Content
            style={{
              overflow: "auto",
              background: "rgba(12, 46, 55, 1)",
            }}
            className={styles.content_wrapper}
          >
            <div style={isSidebarVisible ? {} : { marginTop: "9dvh" }}>
              {outlet}
              {(location?.pathname === "/admin" ||
                location?.pathname === "/pages") && (
                <DynamincFooter></DynamincFooter>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default ProtectedLayout;
