import React from "react";
import { Col, Row } from "antd";
import info from "./data.json";
import styles from "./trending.module.scss"

const Trending = () => {
    return (
        <>

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
                <h2
                    style={{
                        background: "linear-gradient(90deg, #940101 0%, #4560FD 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "Poppins",
                        marginBottom: "1vh",
                        textAlign: "center",
                    }}
                >
                    Trending News
                </h2>


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
            {/* <h2 style={{ color: "red", fontFamily: "Poppins", marginBottom: "1vh", marginTop: "1vh", textAlign: "center" }}>
                Explore More
            </h2>
            <div
                style={{
                    padding: "1vh",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1vh",
                    maxHeight: "47%", // Restrict the container height
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
            </div> */}
        </>
    );
};

export default Trending;
