import { Badge, Row, Col, message, Spin } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "../tabs.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSoccer } from "../../../Redux/lineMatchesSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

const SoccerSection = () => {
  const [datasource, setDataSource] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [LiveCount, setLiveCount] = useState<number>(0);

  const getApiData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://backend.polo.game/api/fantasy/event/1"
      );
      const data = response.data;
      let count = 0;
      data?.data?.map((ele: any) => {
        console.log(ele.isMatchLive, "hey");
        if (ele?.isMatchLive === true) {
          count = count + 1;
        }
      });
      setLiveCount(count);
      dispatch(updateSoccer(count));
      if (location.pathname !== "/soccer") {
        setDataSource(data?.data?.slice(0, 2));
      } else {
        setDataSource(data?.data);
      }
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

  function formatNumber(num: any) {
    if (num >= 1_000_000) {
      return (num / 1_000_000)?.toFixed(1)?.replace(/\.0$/, "") + "M";
    } else if (num >= 10_000) {
      return (num / 1_000)?.toFixed(1)?.replace(/\.0$/, "") + "k";
    }
    return num?.toString()?.split('.')?.[0];
  }

  return (
    <Spin spinning={loading}>
      <div>
        <div className={styles.tableWrapper}>
          <PlayCircleOutlined
            style={{ fontSize: "24px", marginRight: "16px" }}
          />
          <h3 style={{ margin: 0 }}>Soccer</h3>
          <div className={styles.LiveWrapper}>
            <div className={styles.LiveSectionFirst}>
              <div className={styles.marker}>.</div>
              <div className={styles.LiveCircle}></div>
              <div className={styles.marker}>.</div>
            </div>
            <div className={styles.LiveSectionSecond}>{LiveCount}</div>
          </div>
        </div>

        <div className={styles.table}>
        {datasource?.map(
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
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {item?.match?.length > 25
                          ? `${item?.event_name?.substr(0, 25)}...`
                          : item?.event_name}
                      </div>
                      <div style={{ color: "#888", fontSize: "12px" }}>
                        {item?.league?.length > 25
                          ? `${item?.league_name?.substr(0, 25)}...`
                          : item?.league_name}
                      </div>
                    </div>
                    <div style={{ color: "white" }}>
                      {item.inplay && (
                        <Badge status="success" style={{ marginRight: 8 }} />
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
                        {item.runners[0]?.ex?.b[0]?.p ? item.runners[0]?.ex?.b[0]?.p : "-"}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {item.runners[0]?.ex?.b[0]?.s ? formatNumber(item.runners[0]?.ex?.b[0]?.s) : ""}
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
                        {item.runners[0]?.ex?.l[0]?.p ? item.runners[0]?.ex?.l[0]?.p :"-"}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {item.runners[0]?.ex?.l[0]?.s ? formatNumber(item.runners[0]?.ex?.l[0]?.s) : ""}
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
                        {item.runners[2]?.ex?.b[0]?.p ? item.runners[2]?.ex?.b[0]?.p : "-"}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {item.runners[2]?.ex?.b[0]?.s ? formatNumber(item.runners[2]?.ex?.b[0]?.s) : ""}
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
                        {item.runners[2]?.ex?.l[0]?.p ? item.runners[2]?.ex?.l[0]?.p : "-"}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {item.runners[2]?.ex?.l[0]?.s ? formatNumber(item.runners[2]?.ex?.l[0]?.s) : ""}
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
                        {item.runners[1]?.ex?.b[0]?.p ? item.runners[1]?.ex?.b[0]?.p : "-"}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        { item.runners[1]?.ex?.b[0]?.s ? formatNumber(item.runners[1]?.ex?.b[0]?.s) : ""}
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
                        {item.runners[1]?.ex?.l[0]?.p ? item.runners[1]?.ex?.l[0]?.p : "-"}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {item.runners[1]?.ex?.l[0]?.s ? formatNumber(item.runners[1]?.ex?.l[0]?.s) : ""}
                      </div>
                    </Col>
                  </Row>
                </div>
              )
          )}
        </div>
        {location?.pathname === "/" && datasource?.length !== 0 && (
          <Row style={{ color: "white" }} justify={"center"} align={"middle"}>
            <p
              onClick={() => {
                navigate("/soccer");
              }}
              className={styles.showMoreButton}
            >
              <p>view more</p>
              <Icon
                className={styles.ArrowBlink}
                icon="hugeicons:arrow-down-double"
                width="24"
                height="24"
              />
            </p>
          </Row>
        )}
        {datasource?.length === 0 && (
          <Row justify={"center"} style={{ color: "white" }}>
            <h2>No Data Found</h2>
          </Row>
        )}
      </div>
    </Spin>
  );
};

export default SoccerSection;
