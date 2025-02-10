import { Badge, Row, Col, message, Spin } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "../tabs.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatNumber } from "../Cricket";

const InPlay = () => {
  const [datasource, setDataSource] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getApiData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend.polo.game/api/fantasy/inplay"
      );
      const data = response.data;
      setDataSource(data?.data?.inplay);
    } catch (err) {
      console.error(err);
      message.error(
        "Something went wrong in fetching the data.. Please wait while we fix the issue"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (id: any, item: any) => {
    navigate(`/games/${id}`, { state: item });
  };

  useEffect(() => {
    getApiData();
  }, []);


  return (
    <Spin spinning={loading}>
      <div style={{ margin: "16px" }}>
        <div className={styles.tableWrapper}>
          <PlayCircleOutlined
            style={{ fontSize: "24px", marginRight: "16px" }}
          />
          <h3 style={{ margin: 0 }}>In Play</h3>
        </div>

        <div className={styles.table}>
          {datasource.map(
            (item: any) =>
              item?.runnerNames &&
              item?.runnerNames?.length > 0 && (
                <div
                  onClick={() => handleRowClick(item?.event_id, item)}
                  key={item.key}
                  className={styles.tableHeader}
                >
                  <div
                    style={{
                      marginRight: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {item?.match?.length > 25
                          ? `${item?.event_name?.substr(0, 25)}...`
                          : item?.event_name}
                      </div>
                      <div style={{ color: "white", fontSize: "12px" }}>
                        {item?.league?.length > 25
                          ? `${item?.league_name?.substr(0, 25)}...`
                          : item?.league_name}
                      </div>
                    </div>
                    <div style={{ color: "white" }}>
                      {item.inplay && (
                        <Badge
                          status="success"
                          style={{ marginRight: 8, whiteSpace: "nowrap" }}
                        />
                      )}
                      {new Date(item.event_date)?.toLocaleString()}
                    </div>
                  </div>

                  <Row
                    gutter={8}
                    style={{
                      marginTop: "2vh",
                      gap: "2vh",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Col
                      span={3}
                      style={{
                        background: "rgba(50, 163, 188, 1)",
                        padding: "8px",
                        borderRadius: "2vh",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {item.runners[0]?.ex?.b[0]?.p}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {item.runners[0]?.ex?.b[0]?.s}
                      </div>
                    </Col>
                    <Col
                      span={3}
                      style={{
                        background: "rgba(50, 163, 188, 1)",
                        padding: "8px",
                        borderRadius: "2vh",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {item.runners[0]?.ex?.l[0]?.p}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {formatNumber(item.runners[0]?.ex?.l[0]?.s)}
                      </div>
                    </Col>
                    <Col
                      span={3}
                      style={{
                        background: "rgba(200, 109, 220, 1)",
                        padding: "8px",
                        borderRadius: "2vh",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {item.runners[2]?.ex?.b[0]?.p}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {formatNumber(item.runners[2]?.ex?.b[0]?.s)}
                      </div>
                    </Col>
                    <Col
                      span={3}
                      style={{
                        background: "rgba(200, 109, 220, 1)",
                        padding: "8px",
                        borderRadius: "2vh",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {item.runners[2]?.ex?.l[0]?.p}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {formatNumber(item.runners[2]?.ex?.l[0]?.s)}
                      </div>
                    </Col>
                    <Col
                      span={3}
                      style={{
                        background: "rgba(50, 163, 188, 1)",
                        padding: "8px",
                        borderRadius: "2vh",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {item.runners[1]?.ex?.b[0]?.p}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {formatNumber(item.runners[1]?.ex?.b[0]?.s)}
                      </div>
                    </Col>
                    <Col
                      span={3}
                      style={{
                        background: "rgba(50, 163, 188, 1)",
                        padding: "8px",
                        borderRadius: "2vh",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {item.runners[1]?.ex?.l[0]?.p}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {formatNumber(item.runners[1]?.ex?.l[0]?.s)}
                      </div>
                    </Col>
                  </Row>
                </div>
              )
          )}
        </div>
      </div>
    </Spin>
  );
};

export default InPlay;
