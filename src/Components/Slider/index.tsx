import "./yo.css";
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

const images = [
    {
        id: 1,
        src: "/images/aviator_gaming_banner.jpg",
        alt: "Aviator",
    },
    {
        id: 2,
        src: "/images/evolution_gaming_banner.png",
        alt: "Evolution Gaming",
    },
    {
        id: 3,
        src: "/images/ezugi_gaming_banner.jpg",
        alt: "Ezugi",
    },
    {
        id: 4,
        src: "/images/pragmatic_play_live_ezugi_gaming_banner.jpg",
        alt: "Pragmatic Play",
    },
    {
        id: 5,
        src: "/images/gamzix_gaming_banner.jpg",
        alt: "Gamezix",
    },
    {
        id: 6,
        src: "/images/play_tech_gaming_banner.jpg",
        alt: "Playtech",
    },
    {
        id: 7,
        src: "/images/beter_live_gaming_banner.jpg",
        alt: "Better Life",
    },
    {
        id: 8,
        src: "/images/aviatrix_gaming_banner.jpg",
        alt: "Aviatrix",
    },
    {
        id: 9,
        src: "/images/ae_sexy_gaming_banner.jpg",
        alt: "AE_Sexy",
    },
    {
        id: 10,
        src: "/images/tv_bet_gaming_banner.jpg",
        alt: "TV_Bet",
    },
    {
        id: 11,
        src: "/images/aviatrix_gaming_banner.jpg",
        alt: "RoyalGaming",
    },
    {
        id: 12,
        src: "/images/royal_gaming_banner.jpg",
        alt: "AuraEGaming",
    },
    {
        id: 13,
        src: "/images/smart_soft_gaming_banner.jpg",
        alt: "SmartsoftGaming",
    },
];

const SliderComponent = () => {

    const [randomIndex1, setRandomIndex1] = useState(0);
    const [randomIndex2, setRandomIndex2] = useState(1);
    const [randomIndex3, setRandomIndex3] = useState(2);
    const [randomIndex4, setRandomIndex4] = useState(3);
  
    useEffect(() => {
     
      const interval1 = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * images.length);
        setRandomIndex1(randomNumber);
      }, 2000); 
  
      // Interval for Column 2
      const interval2 = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * images.length);
        setRandomIndex2(randomNumber);
      }, 3000); // Change every 3 seconds
  
      // Interval for Column 3
      const interval3 = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * images.length);
        setRandomIndex3(randomNumber);
      }, 4000); // Change every 4 seconds
  
      // Interval for Column 4
      const interval4 = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * images.length);
        setRandomIndex4(randomNumber);
      }, 5000); // Change every 5 seconds
  
      // Cleanup intervals on component unmount
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
      };
    }, []);
  

    return (
        <div>
            <Row>
                <Col span={24}>
                    <img src={images[randomIndex1].src} alt={images[randomIndex1].alt} className="game-image" />
                </Col>
            </Row>
            {/* <Row>
                <Col span={8}><img src={images[randomIndex2].src} alt={images[randomIndex2].alt} className="game-image" /></Col>
                <Col span={8}><img src={images[randomIndex3].src} alt={images[randomIndex3].alt} className="game-image" /></Col>
                <Col span={8}><img src={images[randomIndex4].src} alt={images[randomIndex4].alt} className="game-image" /></Col>
            </Row> */}
        </div>
    );
};

export default SliderComponent;
