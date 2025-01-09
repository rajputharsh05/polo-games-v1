import { useEffect, useState } from "react";
import styles from "./pages.module.scss";
import axios from "axios";
import { Card, Col, message, Row, Spin, Typography } from "antd";
import { BASEURL } from "../../utils/apis";

const Pages = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getApiData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BASEURL}/imagelink/items/`
      );

      const data = response?.data;
      console.log(data);
      setData(data);
    } catch (error) {
      message.error("Unable to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <Card title={
        <Typography style={{color : "white"}} >Our Websites</Typography>
    }>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row className={styles.imageGrid} gutter={[16,16]}>
          {data.map((item) => (
            <Col
              span={24}
              key={item.id}
              className={styles.imageCard}
              onClick={() => window.open(item.link, "_blank")}
            >
              <img
                src={`data:image/png;base64,${item.image_base64}`}
                alt="Thumbnail"
                className={styles.image}
              />
            </Col>
          ))}
        </Row>
      )}
    </Card>
  );
};

export default Pages;
