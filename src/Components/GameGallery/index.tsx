import { Row, Col } from "antd";
import "./yo.css";

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

const GameGallery = () => {
  return (
    <div className="game-gallery">
      <Row gutter={[10, 10]} justify="center">
        {images.map((image) => (
          <Col key={image.id} xs={24} sm={24} md={12} lg={12}>
            <div className="image-wrapper">
              <img src={image.src} alt={image.alt} className="game-image" />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GameGallery;
