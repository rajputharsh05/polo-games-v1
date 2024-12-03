import { Button, Col, Input, Row } from "antd";
import styles from "./header.module.scss"; 
import logo from "../../assets/logo.jpeg";
const HeaderComponent = () => {
  return (
    <Row align="middle" justify="space-between" className={styles.header}>
      
      <Col className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Logo" />
      </Col>
      <Col flex="1" className={styles.searchContainer}>
        <Input.Search
          placeholder="Search Event..."
          className={styles.search}
          style={{marginTop:"3vh"}}
        />
      </Col>
      <Col className={styles.buttonContainer}>
        <Button className={styles.button} type="primary">
          Login
        </Button>
      </Col>
    </Row>
  );
};

export default HeaderComponent;
