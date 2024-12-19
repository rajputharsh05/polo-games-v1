import { Tabs, Col, Row } from "antd";
import info from "./data.json";
import styles from "./trending.module.scss";

export const News = () => (
  <div
    style={{
      padding: "1vh",
      display: "flex",
      flexDirection: "column",
      gap: "1vh",
      maxHeight: "100%", // Restrict the container height
      overflowY: "auto", // Enable vertical scrolling
      color: "white",
      fontSize: "16px",
    }}
    className={styles.trending_container}
  >
    {info?.data?.map((ele, index) => (
      <Row
        key={index}
        gutter={[16, 16]}
        style={{
          paddingBottom: "1vh",
          marginBottom: "1vh",
        }}
      >
        <Col span={8}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
            src={ele?.image}
            alt=""
          />
        </Col>
        <Col
          span={16}
          style={{ color: "white", cursor: "pointer" }}
          title={ele?.description} // Show full description on hover
        >
          <p>{`${ele?.description?.substring(0, 45)}...`}</p>
          <p>{ele?.pub_date}</p>
        </Col>
      </Row>
    ))}
  </div>
);

export const Blogs = () => (
  <div
    style={{
      padding: "1vh",
      color: "white",
      fontSize: "16px",
    }}
  >
    <h3>Blogs Section</h3>
    <p>Display your blogs here...</p>
  </div>
);

export const Reels = () => (
  <div
    style={{
      padding: "1vh",
      color: "white",
      fontSize: "16px",
    }}
  >
    <h3>Reels Section</h3>
    <p>Display your reels here...</p>
  </div>
);

const Trending = () => {
  const items = [
    {
      key: "news",
      label: "News",
      children: <News />,
    },
    {
      key: "blogs",
      label: "Blogs",
      children: <Blogs />,
    },
    {
      key: "reels",
      label: "Reels",
      children: <Reels />,
    },
  ];

  return (
    <div
      style={{
        background: "#1a1a1a",
        color: "white",
        padding: "1vh",
        borderRadius: "8px",
      }}
    >
      <Tabs
        defaultActiveKey="news"
        items={items}
        centered
        tabBarStyle={{
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      />
    </div>
  );
};

export default Trending;
