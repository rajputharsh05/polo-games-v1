import axios from "axios"
import styles from "./matchPage.module.scss"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Col, Row, Spin } from "antd"


interface Props {
    apiurl: string
}

const MatchPage = (data: Props) => {

    const { id } = useParams();

    const [datasource, setDataSource] = useState([
        {
            "gmid": 658616900,
            "mid": 9083776427274,
            "pmid": null,
            "mname": "MATCH_ODDS",
            "rem": "",
            "gtype": "match",
            "status": "OPEN",
            "rc": 3,
            "visible": false,
            "pid": 0,
            "gscode": 1,
            "maxb": 25000,
            "sno": 1,
            "dtype": 4,
            "ocnt": 6,
            "m": 0,
            "max": 2000,
            "min": 0,
            "biplay": true,
            "umaxbof": 1,
            "boplay": true,
            "iplay": true,
            "btcnt": 4,
            "company": null,
            "section": [
                {
                    "mid": 9083776427274,
                    "sid": 83500,
                    "psid": 0,
                    "sno": 1,
                    "psrno": 1,
                    "gstatus": "ACTIVE",
                    "nat": "South Africa",
                    "gscode": 1,
                    "max": 0,
                    "min": 0,
                    "rem": "",
                    "br": false,
                    "rname": null,
                    "jname": null,
                    "tname": null,
                    "hage": 0,
                    "himg": null,
                    "adfa": 0,
                    "rdt": null,
                    "cno": null,
                    "sdraw": null,
                    "odds": [
                        {
                            "sid": 83500,
                            "psid": 0,
                            "odds": 1.7,
                            "otype": "back",
                            "oname": "back3",
                            "tno": 2,
                            "size": 145.81
                        },
                        {
                            "sid": 83500,
                            "psid": 0,
                            "odds": 1.71,
                            "otype": "back",
                            "oname": "back2",
                            "tno": 1,
                            "size": 2397.55
                        },
                        {
                            "sid": 83500,
                            "psid": 0,
                            "odds": 1.72,
                            "otype": "back",
                            "oname": "back1",
                            "tno": 0,
                            "size": 222.62
                        },
                        {
                            "sid": 83500,
                            "psid": 0,
                            "odds": 1.73,
                            "otype": "lay",
                            "oname": "lay1",
                            "tno": 0,
                            "size": 33.97
                        },
                        {
                            "sid": 83500,
                            "psid": 0,
                            "odds": 1.74,
                            "otype": "lay",
                            "oname": "lay2",
                            "tno": 1,
                            "size": 116.23
                        },
                        {
                            "sid": 83500,
                            "psid": 0,
                            "odds": 1.75,
                            "otype": "lay",
                            "oname": "lay3",
                            "tno": 2,
                            "size": 167.82
                        }
                    ]
                },
                {
                    "mid": 9083776427274,
                    "sid": 64151,
                    "psid": 0,
                    "sno": 2,
                    "psrno": 2,
                    "gstatus": "ACTIVE",
                    "nat": "Sri Lanka",
                    "gscode": 1,
                    "max": 0,
                    "min": 0,
                    "rem": "",
                    "br": false,
                    "rname": null,
                    "jname": null,
                    "tname": null,
                    "hage": 0,
                    "himg": null,
                    "adfa": 0,
                    "rdt": null,
                    "cno": null,
                    "sdraw": null,
                    "odds": [
                        {
                            "sid": 64151,
                            "psid": 0,
                            "odds": 2.48,
                            "otype": "back",
                            "oname": "back3",
                            "tno": 2,
                            "size": 118.42
                        },
                        {
                            "sid": 64151,
                            "psid": 0,
                            "odds": 2.52,
                            "otype": "back",
                            "oname": "back2",
                            "tno": 1,
                            "size": 23.32
                        },
                        {
                            "sid": 64151,
                            "psid": 0,
                            "odds": 2.54,
                            "otype": "back",
                            "oname": "back1",
                            "tno": 0,
                            "size": 79.62
                        },
                        {
                            "sid": 64151,
                            "psid": 0,
                            "odds": 2.56,
                            "otype": "lay",
                            "oname": "lay1",
                            "tno": 0,
                            "size": 206.31
                        },
                        {
                            "sid": 64151,
                            "psid": 0,
                            "odds": 2.58,
                            "otype": "lay",
                            "oname": "lay2",
                            "tno": 1,
                            "size": 151.99
                        },
                        {
                            "sid": 64151,
                            "psid": 0,
                            "odds": 2.6,
                            "otype": "lay",
                            "oname": "lay3",
                            "tno": 2,
                            "size": 49.01
                        }
                    ]
                },
                {
                    "mid": 9083776427274,
                    "sid": 479892,
                    "psid": 0,
                    "sno": 3,
                    "psrno": 3,
                    "gstatus": "ACTIVE",
                    "nat": "The Draw",
                    "gscode": 1,
                    "max": 0,
                    "min": 0,
                    "rem": "",
                    "br": false,
                    "rname": null,
                    "jname": null,
                    "tname": null,
                    "hage": 0,
                    "himg": null,
                    "adfa": 0,
                    "rdt": null,
                    "cno": null,
                    "sdraw": null,
                    "odds": [
                        {
                            "sid": 479892,
                            "psid": 0,
                            "odds": 30,
                            "otype": "back",
                            "oname": "back3",
                            "tno": 2,
                            "size": 270.3
                        },
                        {
                            "sid": 479892,
                            "psid": 0,
                            "odds": 32,
                            "otype": "back",
                            "oname": "back2",
                            "tno": 1,
                            "size": 138.79
                        },
                        {
                            "sid": 479892,
                            "psid": 0,
                            "odds": 34,
                            "otype": "back",
                            "oname": "back1",
                            "tno": 0,
                            "size": 12.68
                        },
                        {
                            "sid": 479892,
                            "psid": 0,
                            "odds": 36,
                            "otype": "lay",
                            "oname": "lay1",
                            "tno": 0,
                            "size": 73.2
                        },
                        {
                            "sid": 479892,
                            "psid": 0,
                            "odds": 38,
                            "otype": "lay",
                            "oname": "lay2",
                            "tno": 1,
                            "size": 30.92
                        },
                        {
                            "sid": 479892,
                            "psid": 0,
                            "odds": 40,
                            "otype": "lay",
                            "oname": "lay3",
                            "tno": 2,
                            "size": 60.16
                        }
                    ]
                }
            ]
        }
    ])

    const [loading, setLoading] = useState(false);

    const getApiData = async (id: any) => {

        try {
            setLoading(true);
            const URL = `${data?.apiurl}?eventId=${id}`;
            const response = await axios.get(URL);
            const ApiData = response?.data;
            if (ApiData?.success === true) {
                setDataSource(ApiData?.data);
            }
        } catch (error) {

            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const colors = ['rgb(199, 238, 255)', 'rgb(199, 238, 255)', 'rgb(148, 223, 255)', 'rgb(249, 200, 211)', 'rgb(239, 225, 229)', 'rgb(239, 225, 229)']

    useEffect(() => {
        getApiData(id);
    }, [])


    return (
        <Spin spinning={loading}>
            <div style={{ margin: "16px" }}>
                <div className={styles.tableWrapperHeader}>
                    <Row style={{ height: "30%", width: "100%" }}>
                        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", borderRadius: "4vh", background: "linear-gradient(to right, rgba(128, 0, 128, 0) 0%, purple 100%)" }} span={10}> {datasource[0]?.section[0]?.nat}</Col>
                        <Col style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "24px"
                        }} span={4}>v/s</Col>
                        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", borderRadius: "4vh", background: "linear-gradient(to right, purple 0%, rgba(128, 0, 128, 0) 100%)" }} span={10}> {datasource[0]?.section[1]?.nat}</Col>
                    </Row>
                </div>
                <div className={styles.tableWrapper}>
                    <h3 style={{ margin: 0 }}>Match Odds</h3>
                </div>

                <div className={styles.table}>
                    {datasource[0]?.section?.map((item: any) => (
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
                                    <div style={{ fontWeight: "bold" }}>{item?.nat?.length > 25 ? `${item?.nat?.substr(0, 25)}...` : item?.nat}</div>
                                </div>
                            </div>


                            <Row gutter={8} style={{ flex: 3 }}>
                                {item.odds.map((odd: any, idx: number) => (
                                    <>
                                        <Col
                                            span={4}
                                            key={odd.sid}
                                            style={{
                                                background: colors[idx],
                                                padding: "8px",
                                                border: "1px solid white",
                                                textAlign: "center",
                                            }}
                                        >
                                            <div style={{ fontWeight: "bold" }}>{odd.odds}</div>
                                            <div style={{ fontSize: "10px", color: "#666" }}>
                                                {odd.size}
                                            </div>
                                        </Col>
                                    </>
                                ))}
                            </Row>
                        </div>
                    ))}
                </div>
            </div>
        </Spin>
    )

}


export default MatchPage