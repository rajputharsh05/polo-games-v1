import { Badge, Row, Col, message, Spin } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "../tabs.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTennis } from "../../../Redux/lineMatchesSlice";
import { useDispatch } from "react-redux";

const TennisSection = () => {
  const [datasource, setDataSource] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [LiveCount, setLiveCount] = useState<number>(0);

  const ModifyData = (data: []) => {
    let count = 0;
    const ModifiedData = data?.map((ele: any) => {
      if (ele?.iplay) {
        count += 1;
      }
      const obj = {
        match: ele?.ename,
        status: ele?.iplay ? "live" : "upcoming",
        league: ele?.cname,
        time: ele?.stime,
        gameId: ele?.gameId,
        odds: [
          {
            key: "1",
            value: ele?.section[0]?.odds[0]?.odds,
            extra: ele?.section[0]?.odds[1]?.odds,
            color: "rgba(50, 163, 188, 1)",
          },
          {
            key: "2",
            value: ele?.section[1]?.odds[0]?.odds,
            extra: ele?.section[1]?.odds[1]?.odds,
            color: "rgba(200, 109, 220, 1)",
          },
          {
            key: "3",
            value: ele?.section[2]?.odds[0]?.odds,
            extra: ele?.section[2]?.odds[1]?.odds,
            color: "rgba(50, 163, 188, 1)",
          },
        ],
      };
      return obj;
    });

    if (location?.pathname === "/" && ModifiedData?.length > 3) {
      setDataSource(ModifiedData.slice(0, 2));
    } else {
      setDataSource(ModifiedData);
    }
    setLiveCount(count);
    dispatch(updateTennis(count));
  };

  const getApiData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://marketsarket.qnsports.live/gettennismatches"
      );
      const data = response.data;
      ModifyData(data);
    } catch (err) {
      console.error(err);
      message.error(
        "Something went wrong in fetching the data.. Please wait while we fix the issue"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleRowClick = (id: any , item : any) => {
    navigate(`/games/${id}` , {state : item});
  };

  return (
    <Spin spinning={loading}>
      <div>
        <div className={styles.tableWrapper}>
          <PlayCircleOutlined
            style={{ fontSize: "24px", marginRight: "16px" }}
          />
          <h3 style={{ margin: 0 }}>Tennis</h3>
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
          {datasource.map((item: any) => (
            <div
              onClick={() => handleRowClick(item?.gameId , item)}
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
                      ? `${item?.match?.substr(0, 25)}...`
                      : item?.match}
                  </div>
                  <div style={{ color: "white", fontSize: "12px" }}>
                    {item?.league?.length > 25
                      ? `${item?.league?.substr(0, 25)}...`
                      : item?.league}
                  </div>
                </div>
                <div style={{ color: "white" }}>
                  {item.status === "live" && (
                    <Badge status="success" style={{ marginRight: 8 }} />
                  )}
                  {item.time}
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
                {item.odds.map((odd: any) => (
                  <>
                    <Col
                      span={3}
                      key={odd.key}
                      style={{
                        background: odd.color,
                        padding: "8px",
                        borderRadius: "2vh",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {odd.value}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {odd.extra}
                      </div>
                    </Col>
                    <Col
                      span={3}
                      key={odd.key}
                      style={{
                        background: odd.color,
                        padding: "8px",
                        borderRadius: "2vh",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "white ", fontWeight: "bold" }}>
                        {odd.value}
                      </div>
                      <div style={{ fontSize: "10px", color: "white" }}>
                        {odd.extra}
                      </div>
                    </Col>
                  </>
                ))}
              </Row>
            </div>
          ))}
          {datasource?.length === 0 && (
            <Row justify={"center"} style={{ color: "white" }}>
              <h2>No Data Found</h2>
            </Row>
          )}
          {location?.pathname === "/" && datasource?.length !== 0 && (
            <Row style={{ color: "white" }} justify={"center"} align={"middle"}>
              <p
                onClick={() => {
                  navigate("/tennis");
                }}
                className={styles.showMoreButton}
              >
                view more ?
              </p>
            </Row>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default TennisSection;
