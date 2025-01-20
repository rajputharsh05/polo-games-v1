import { Badge, Row, Col } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "../tabs.module.scss";
const inPlayData = [
  // Cricket
  {
    key: "1",
    match: "India vs Australia",
    league: "Cricket World Cup",
    status: "live",
    date: "24 Nov",
    time: "3:00 PM",
    odds: [
      { key: "1", value: "1.6", extra: "1.2", color: "#add8e6" },
      { key: "X", value: "2.8", extra: "2.3", color: "#ffc0cb" },
      { key: "2", value: "3.5", extra: "2.3", color: "#add8e6" },
    ],
  },
  // Tennis
  {
    key: "2",
    match: "Novak Djokovic vs Carlos Alcaraz",
    league: "ATP Finals",
    status: "live",
    date: "24 Nov",
    time: "5:00 PM",
    odds: [
      { key: "1", value: "1.7", extra: "1.3", color: "#ffc0cb" },
      { key: "X", value: "2.5", extra: "2.3", color: "#add8e6" },
      { key: "2", value: "2.1", extra: "2.3", color: "#add8e6" },
    ],
  },
  // Horse Riding
  {
    key: "3",
    match: "Royal Derby 2024",
    league: "Equestrian Racing",
    status: "live",
    date: "24 Nov",
    time: "4:00 PM",
    odds: [
      { key: "1", value: "2.5", extra: "1.4", color: "#add8e6" },
      { key: "X", value: "3.1", extra: "6.1", color: "#ffc0cb" },
      { key: "2", value: "4.2", extra: "2.3", color: "#add8e6" },
    ],
  },
];

const InPlay = () => {
  return (
    <div style={{ margin: "16px" }}>
      <div className={styles.tableWrapper}>
        <PlayCircleOutlined style={{ fontSize: "24px", marginRight: "16px" }} />
        <h3 style={{ margin: 0 }}>Soccer</h3>
      </div>

      <div className={styles.table}>
        {inPlayData.map((item) => (
          <div key={item.key} className={styles.tableHeader}>
            <div
              style={{
                flex: 2,
                marginRight: "16px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold" }}>{item.match}</div>
                <div style={{ color: "#888", fontSize: "12px" }}>
                  {item.league}
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

export default InPlay;
