import { useEffect, useState } from "react";
import { Tabs, Row, Col, Card } from "antd";
import "./yoyo.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const { TabPane } = Tabs;

const CasinoGallery = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [logoData, setLogodata] = useState<any>([]);
  const BASEURL = import.meta.env.VITE_BASEURL;
  const getLogos = async () => {
    try {
      const response = await axios.get(`${BASEURL}/socialmedia/items`);
      console.log(response, "errorTest");
      setLogodata(response?.data);
    } catch (error) {
      console.error(error , "errorTest");
    }
  };

  const liveImages = [
    { src: "/images/Super+Over.webp", title: "Super Over Judgement" },
    { src: "/images/3+Cards+Judgement.webp", title: "3 Cards Judgement" },
    { src: "/images/Live+Teenpatti.webp", title: "Live Teenpatti" },
    { src: "/images/Teenpatti+T20.webp", title: "Reenpatti T20" },
    { src: "/images/Teenpatti+Test.webp", title: "Teenpatti Test" },
    { src: "/images/2+Cards+Teenpatti.webp", title: "2 Cards Teenpatti" },
    { src: "/images/Teenpatti+Open.webp", title: "Teenpatti Open" },
    { src: "/images/Muflis+Teenpatti.webp", title: "Muflis Teenpatti" },
    { src: "/images/dragon_tiger.avif", title: "Dragon Tiger" },
    { src: "/images/32+cards+casino.webp", title: "32 cards casino" },
    { src: "/images/Bollywood+Casino.webp", title: "Bollywood Casino" },
    { src: "/images/Amar+Akbar+Anthony.webp", title: "Amar+Akbar_Anthony" },
    { src: "/images/queen.avif", title: "Queen" },
    { src: "/images/Baccarat.webp", title: "Baccarat" },
    { src: "/images/29+Card+Baccarat.webp", title: "29+Card_Baccarat" },
    { src: "/images/Casino+War.webp", title: "Casino+War" },
    { src: "/images/Casino+Meter.webp", title: "Casino+Meter" },
    { src: "/images/Trio.webp", title: "Trio" },
    { src: "/images/Hi+Low.webp", title: "Hi+Low" },
    { src: "/images/Race+20-20.webp", title: "Race+20-20" },
    { src: "/images/Race+to+17.webp", title: "Race+to+17" },
    { src: "/images/7+up+&+Down.webp", title: "7+up+&+Down" },
    { src: "/images/Andar+Bahar.webp", title: "Andar+Bahar" },
    { src: "/images/Poker.webp", title: "Poker" },
    { src: "/images/Poker+20-20.webp", title: "Poker+20-20" },
    { src: "/images/Six+player+poker.webp", title: "Six+player+poker" },
    { src: "/images/The+Trap.webp", title: "The+Trap" },
    { src: "/images/Worli+Matka.webp", title: "Worli+Matka" },
    { src: "/images/Roulette.webp", title: "Roulette" },
    { src: "/images/Sicbo.webp", title: "Sicbo" },
  ];

  const virtualImages = [
    {
      src: "/virtual_casino_images/Baccarat+(Virtual).webp",
      title: "Baccarat+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Race+20-20+(Virtual).webp",
      title: "Race+20-20+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Amar+Akbar+Anthony+(Virtual).webp",
      title: "Amar+Akbar+Anthony+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Poker+20-20+(Virtual).webp",
      title: "Poker+20-20+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Teenpatti+Open+(virtual).webp",
      title: "Teenpatti+Open+(virtual)",
    },
    {
      src: "/virtual_casino_images/Teenpatti+Test+(virtual).webp",
      title: "Teenpatti+Test+(virtual)",
    },
    {
      src: "/virtual_casino_images/Queen+(virtual).webp",
      title: "Queen+(virtual)",
    },
    {
      src: "/virtual_casino_images/Trio+(virtual).webp",
      title: "Trio+(virtual)",
    },
    {
      src: "/virtual_casino_images/Muflis+Teenpatti+(virtual).webp",
      title: "Muflis+Teenpatti+(virtual)",
    },
    {
      src: "/virtual_casino_images/Casino+War+(Virtual).webp",
      title: "Casino+War+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Casino+Meter+(Virtual).webp",
      title: "Casino+Meter+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Bollywood+Casino+(Virtual).webp",
      title: "Bollywood+Casino+(Virtual)",
    },
    {
      src: "/virtual_casino_images/7+up+&+Down+(Virtual).webp",
      title: "7+up+&+Down+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Teenpatti+T20+(Virtual).webp",
      title: "Teenpatti+T20+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Andar+Bahar+(Virtual).webp",
      title: "Andar+Bahar+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Hi+Low+(Virtual).webp",
      title: "Hi+Low+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Dragon+Tiger+(Virtual).webp",
      title: "Dragon+Tiger+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Teenpatti+One-Day+(Virtual).webp",
      title: "Teenpatti+One-Day+(Virtual)",
    },
    {
      src: "/virtual_casino_images/32+cards+casino+(Virtual).webp",
      title: "32+cards+casino+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Matka+(Virtual).webp",
      title: "Matka+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Poker++(Virtual).webp",
      title: "Poker++(Virtual)",
    },
    {
      src: "/virtual_casino_images/Six+player+poker+(Virtual).webp",
      title: "Six+player+poker+(Virtual)",
    },
    {
      src: "/virtual_casino_images/Roulette+(Virtual).webp",
      title: "Roulette+(Virtual)",
    },
    { src: "/images/dream_catcher.avif", title: "dream_catcher" },
  ];
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Scroll to the section
      }
    }
  }, [location]);


  useEffect(() => {
    getLogos();
  }, []);
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      <Row id="target-section" className="mitunClass" justify={"space-around"} style={{backgroundColor:"rgba(12, 46, 55, 1)"}}>
        <Col span={24} style={{display:"flex" , justifyContent:"center" , alignItems:"center" , fontFamily:"Popins" , color:"white" , fontSize:"20px" , marginBottom:"2vh"}}>
          Follow us on 
        </Col>
        {logoData?.map((item: any) => {
          return (
            <Col
              span={6}
              onClick={() => {
                window.open(item?.link, "_blank");
              }}
              style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
              }}
            >
              <img
                src={`data:image/png;base64,${item.image_base64}`}
                alt="Play Icon"
                style={{height:"30px"}}
              />
            </Col>
          );
        })}
      </Row>
      <Tabs
        className="casino-gallery"
        activeKey={activeTab}
        onChange={handleTabChange}
      >
        <TabPane tab="Live Casino" key="live">
          <Row gutter={[16, 16]}>
            {liveImages.map((image, index) => (
              <Col key={index} xs={12} sm={12} md={12} lg={8} xl={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={image.title}
                      src={image.src}
                      className="live-casino-image"
                    />
                  }
                >
                  {/* <Meta title={image.title} /> */}
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Virtual Casino" key="virtual">
          <Row gutter={[16, 16]}>
            {virtualImages.map((image, index) => (
              <Col key={index} xs={12} sm={12} md={12} lg={8} xl={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={image.title}
                      src={image.src}
                      className="live-casino-image"
                    />
                  }
                >
                  {/* <Meta title={image.title} /> */}
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </>
  );
};

export default CasinoGallery;
