import { Badge, Row, Col } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "../tabs.module.scss";
const horseRidingData = [
  {
    key: "1",
    match: "Royal Derby 2024",
    league: "Equestrian Racing",
    status: "live",
    date: "25 Nov",
    time: "4:00 PM",
    odds: [
      { key: "1", value: "2.5", extra: "8.9", color: "#add8e6" },
      { key: "X", value: "3.1", extra: "10.7", color: "#ffc0cb" },
      { key: "2", value: "4.2", extra: "7.2", color: "#add8e6" },
    ],
  },
  {
    key: "2",
    match: "National Equestrian Championship",
    league: "Equestrian Racing",
    status: "upcoming",
    date: "27 Nov",
    time: "5:30 PM",
    odds: [
      { key: "1", value: "3.0", extra: "1.2", color: "#add8e6" },
      { key: "X", value: "2.8", extra: "1.9", color: "#ffc0cb" },
      { key: "2", value: "5.0", extra: "3.2", color: "#add8e6" },
    ],
  },
];

const HorseRidding = () => {
  return (
    <div style={{ margin: "16px" }}>
      <div className={styles.tableWrapper}>
        <PlayCircleOutlined style={{ fontSize: "24px", marginRight: "16px" }} />
        <h3 style={{ margin: 0 }}>Horse Ridding</h3>
      </div>

      <div className={styles.table}>
        {horseRidingData.map((item) => (
          <div key={item.key} className={styles.tableHeader}>
            <div
              style={{
                flex: 2,
                marginRight: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {item?.match?.length > 25
                    ? `${item?.match?.substr(0, 25)}...`
                    : item?.match}
                </div>
                <div style={{ color: "#888", fontSize: "12px" }}>
                  {item?.league?.length > 25
                    ? `${item?.league?.substr(0, 25)}...`
                    : item?.league}
                </div>
              </div>
              <div>
                {item.status === "live" && (
                  <Badge status="success" style={{ marginRight: 8 }} />
                )}
                {item.date} - {item.time}
              </div>
            </div>

            <Row gutter={8} style={{ flex: 3 }}>
              {item.odds.map((odd) => (
                <>
                  <Col
                    span={4}
                    key={odd.key}
                    style={{
                      background: odd.color,
                      padding: "8px",
                      border: "1px solid white",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>{odd.value}</div>
                    <div style={{ fontSize: "10px", color: "#666" }}>
                      {odd.extra}
                    </div>
                  </Col>
                  <Col
                    span={4}
                    key={odd.key}
                    style={{
                      background: odd.color,
                      padding: "8px",
                      border: "1px solid white",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>{odd.value}</div>
                    <div style={{ fontSize: "10px", color: "#666" }}>
                      {odd.extra}
                    </div>
                  </Col>
                </>
              ))}
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorseRidding;
