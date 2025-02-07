import axios from "axios";
import styles from "./matchPage.module.scss";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row, Spin } from "antd";

interface Props {
  apiurl: string;
}

const MatchPage = (data: Props) => {
  const { id } = useParams();
  const location = useLocation();

  const [datasource, setDataSource] = useState<any>([]);
  const [matchData, setMatchData] = useState<any>();
  const [fancyData, setFancyData] = useState<any>({});
  const [bookMakerdata, setBookMakerData] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const getApiData = async (id: any) => {
    try {
      setLoading(true);
      const URL = `${data?.apiurl}/${id}`;
      const response = await axios.get(URL, {
        url: URL,
      });
      const ApiData = response?.data;
      if (ApiData?.success === true) {
        setDataSource(ApiData?.data?.match);
        const res = ApiData?.data?.match?.fancyOddData?.ml.reduce(
          (acc: any, obj: any) => {
            const key = obj.cat;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          },
          {}
        );
        setFancyData(res);
        setBookMakerData(ApiData?.data?.match?.bookmakerOddData || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData(id);
    setMatchData(location?.state);
  }, []);

  function formatNumber(num: any) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 10_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num?.toString()?.split('.')?.[0];
  }

  return (
    <Spin spinning={loading}>
      <>
        {datasource?.length === 0 && loading === false ? (
          <Row
            justify={"center"}
            style={{ fontFamily: "Popins", color: "white" }}
          >
            <h1>No Data Available For this Event...</h1>
          </Row>
        ) : (
          <div>
            <Spin spinning={loading}>
              <div className={styles.tableWrapperHeader}>
                <Row
                  justify={"center"}
                  style={{ marginBottom: "2vh", fontFamily: "Popins" }}
                >
                  <Col span={24}>
                    <h3>{!loading && matchData?.eventDate}</h3>
                  </Col>
                </Row>
                <Row style={{ height: "40%", width: "100%" }}>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      borderRadius: "4vh",
                      fontFamily: "Popins",
                      background:
                        "linear-gradient(to right, rgba(128, 0, 128, 0) 0%, purple 100%)",
                    }}
                    span={10}
                  >
                    {" "}
                    {datasource?.eventName?.split(" v ")?.[0]}
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      fontFamily: "Popins",
                    }}
                    span={4}
                  >
                    v/s
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      borderRadius: "4vh",
                      fontFamily: "Popins",
                      background:
                        "linear-gradient(to right, purple 0%, rgba(128, 0, 128, 0) 100%)",
                    }}
                    span={10}
                  >
                    {" "}
                    {datasource?.eventName?.split(" v ")?.[1]}
                  </Col>
                </Row>
              </div>
            </Spin>

            {datasource?.matchOddData?.map((items: any) => {
              return (
                <>
                  <div className={styles.tableWrapper}>
                    <h3 style={{ margin: 0, fontFamily: "Popins" }}>
                      {items?.marketName}
                    </h3>
                  </div>
                  {items?.runnerName?.map((matchs: any, idx: number) => {
                    return (
                      <div className={styles.tableHeader}>
                        <div
                          style={{
                            flex: 2,
                            marginRight: "16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "white",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: "bold",
                                color: "white",
                                marginBottom: "1vh",
                              }}
                            >
                              {matchs?.RN}
                            </div>
                          </div>
                        </div>

                        <Row
                          gutter={8}
                          style={{ flex: 3, justifyContent: "space-around" }}
                        >
                          <Col
                            span={6}
                            style={{
                              background: "rgba(200, 109, 220, 1)",
                              padding: "8px",
                              textAlign: "center",
                              borderRadius: "2vh",
                              color: "white",
                            }}
                          >
                            <div style={{ fontWeight: "bold" }}>
                              {" "}
                              {items?.runners[idx]?.ex?.b[0]?.p ? items?.runners[idx]?.ex?.b[0]?.p : "-"}
                            </div>
                            <div style={{ fontSize: "10px", color: "#666" }}>
                              {formatNumber(items?.runners[idx]?.ex?.b[0]?.s)}
                            </div>
                          </Col>
                          {items?.marketName !== "Who Will Win The Match?" && (
                            <Col
                              span={6}
                              style={{
                                background: "rgba(50, 163, 188, 1)",
                                padding: "8px",
                                textAlign: "center",
                                borderRadius: "2vh",
                                color: "white",
                              }}
                            >
                              <div style={{ fontWeight: "bold" }}>
                                {" "}
                                {items?.runners[idx]?.ex?.l[0]?.p ? items?.runners[idx]?.ex?.l[0]?.p : ""}
                              </div>
                              <div style={{ fontSize: "10px", color: "#666" }}>
                                {formatNumber(items?.runners[idx]?.ex?.l[0]?.s)}
                              </div>
                            </Col>
                          )}
                        </Row>
                      </div>
                    );
                  })}
                </>
              );
            })}

            {fancyData &&
              Object.values(fancyData)?.map((bigItems: any) => {
                return (
                  <>
                    <div className={styles.tableWrapper}>
                      <h3 style={{ margin: 0, fontFamily: "Popins" }}>
                        {bigItems[0]?.cat?.replaceAll("_", " ").toUpperCase()}
                      </h3>
                    </div>
                    {bigItems.map((value: any) => {
                      return (
                        <>
                          <div key={value.key} className={styles.tableHeader}>
                            <div
                              style={{
                                flex: 2,
                                marginRight: "16px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                color: "white",
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    color: "white",
                                    marginBottom: "1vh",
                                  }}
                                >
                                  {value?.mn}
                                </div>
                              </div>
                            </div>

                            <Row
                              gutter={8}
                              style={{
                                flex: 3,
                                justifyContent: "space-around",
                              }}
                            >
                              <Col
                                span={6}
                                style={{
                                  background: "rgba(200, 109, 220, 1)",
                                  padding: "8px",
                                  textAlign: "center",
                                  borderRadius: "2vh",
                                  color: "white",
                                }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  {value?.rn ? value?.rn : "-"}
                                </div>
                                <div
                                  style={{ fontSize: "10px", color: "#666" }}
                                >
                                  {formatNumber(value?.on)}
                                </div>
                              </Col>
                              <Col
                                span={6}
                                style={{
                                  background: "rgba(50, 163, 188, 1)",
                                  padding: "8px",
                                  textAlign: "center",
                                  borderRadius: "2vh",
                                  color: "white",
                                }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  {value?.ry ? value?.ry : "-"}
                                </div>
                                <div
                                  style={{ fontSize: "10px", color: "#666" }}
                                >
                                  {formatNumber(value?.oy)}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </>
                      );
                    })}
                  </>
                );
              })}

            {bookMakerdata?.ml?.map((bigItems: any) => {
              return (
                <>
                  <div className={styles.tableWrapper}>
                    <h3 style={{ margin: 0, fontFamily: "Popins" }}>
                      {bigItems?.mn}
                    </h3>
                  </div>
                  {bigItems?.sl?.map((value: any) => {
                    return (
                      <>
                        <div key={value.key} className={styles.tableHeader}>
                          <div
                            style={{
                              flex: 2,
                              marginRight: "16px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              color: "white",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontWeight: "bold",
                                  color: "white",
                                  marginBottom: "1vh",
                                }}
                              >
                                {value?.sln}
                              </div>
                            </div>
                          </div>

                          <Row
                            gutter={8}
                            style={{
                              flex: 3,
                              justifyContent: "space-around",
                            }}
                          >
                            <Col
                              span={6}
                              style={{
                                background: "rgba(200, 109, 220, 1)",
                                padding: "8px",
                                textAlign: "center",
                                borderRadius: "2vh",
                                color: "white",
                              }}
                            >
                              <div style={{ fontWeight: "bold" }}>
                                {value?.b ? value?.b : "-"}
                              </div>
                              <div style={{ fontSize: "10px", color: "#666" }}>
                                {formatNumber(bigItems?.ms)}
                              </div>
                            </Col>
                            <Col
                              span={6}
                              style={{
                                background: "rgba(50, 163, 188, 1)",
                                padding: "8px",
                                textAlign: "center",
                                borderRadius: "2vh",
                                color: "white",
                              }}
                            >
                              <div style={{ fontWeight: "bold" }}>
                                {value?.l ? value?.l : "-"}
                              </div>
                              <div style={{ fontSize: "10px", color: "#666" }}>
                                {formatNumber(bigItems?.ms)}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>
        )}
      </>
    </Spin>
  );
};

export default MatchPage;
