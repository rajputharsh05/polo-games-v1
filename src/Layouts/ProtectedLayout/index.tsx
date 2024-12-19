import { Layout } from "antd";
import { useOutlet } from "react-router-dom";
import HeaderComponent from "../../Components/Header";
const { Sider, Content, Header } = Layout;
import styles from "../GlobalLayout/globalLayout.module.scss"

const ProtectedLayout = () => {
    const outlet = useOutlet();
    return (
        <Layout style={{
            minHeight: "100vh",
            width: "100vw",
            background: "rgba(12, 46, 55, 1)",
        }}>
            <Header style={{
                background: "rgba(12, 46, 55, 1)",
                position: "fixed",
                top: 0,
                width: "100vw",
                zIndex: 1000,
                height: "10vh",
                padding: "0px 0px",
            }}>
                <HeaderComponent></HeaderComponent>
            </Header>
            <Layout style={{ marginTop: "12vh", background: "rgba(12, 46, 55, 1)" }}>
                <Content style={{
            overflow: "auto",
            background: "rgba(12, 46, 55, 1)",
          }}  className={styles.content_wrapper}>
                    {outlet}
                </Content>
                <Sider 
                ></Sider>
            </Layout>
        </Layout>
    )
}

export default ProtectedLayout