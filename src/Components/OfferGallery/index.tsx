import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { message, Spin } from "antd";
import axios from "axios";
import "./OfferSection.css";

interface Offer {
  title: string;
  description: string;
  discount_percentage: number;
  valid_from: string;
  valid_until: string;
  id: number;
  image_base64: string;
}

const dummyOffers: Offer[] = [
  {
    id: 1,
    title: "Summer Sale Bonanza",
    description: "Get up to 50% off on summer essentials.",
    discount_percentage: 50,
    valid_from: "2025-01-01",
    valid_until: "2025-01-31",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 2,
    title: "Winter Wonderland Deals",
    description: "Save big on winter wear and accessories.",
    discount_percentage: 40,
    valid_from: "2025-02-01",
    valid_until: "2025-02-28",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 3,
    title: "Electronics Mega Sale",
    description: "Up to 70% off on electronics and gadgets.",
    discount_percentage: 70,
    valid_from: "2025-03-01",
    valid_until: "2025-03-15",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 4,
    title: "Home Essentials Offer",
    description: "Flat 30% off on home essentials and decor.",
    discount_percentage: 30,
    valid_from: "2025-04-01",
    valid_until: "2025-04-15",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 5,
    title: "Fashion Fiesta",
    description: "Exclusive deals on the latest fashion trends.",
    discount_percentage: 60,
    valid_from: "2025-05-01",
    valid_until: "2025-05-31",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 6,
    title: "Travel Deals Galore",
    description: "Discounts on travel packages and tickets.",
    discount_percentage: 25,
    valid_from: "2025-06-01",
    valid_until: "2025-06-30",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 7,
    title: "Back to School Specials",
    description: "Save on school supplies and accessories.",
    discount_percentage: 20,
    valid_from: "2025-07-01",
    valid_until: "2025-07-15",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 8,
    title: "Fitness Frenzy",
    description: "Up to 50% off on fitness gear and equipment.",
    discount_percentage: 50,
    valid_from: "2025-08-01",
    valid_until: "2025-08-31",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 9,
    title: "Kitchenware Carnival",
    description: "Big discounts on premium kitchenware.",
    discount_percentage: 35,
    valid_from: "2025-09-01",
    valid_until: "2025-09-30",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
  {
    id: 10,
    title: "Luxury Living Sale",
    description: "Save on luxury furniture and decor items.",
    discount_percentage: 45,
    valid_from: "2025-10-01",
    valid_until: "2025-10-15",
    image_base64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/FFf2HsAAAAASUVORK5CYII=",
  },
];

const OfferSection = () => {
  const BASEURL = import.meta.env.VITE_BASEURL;
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOfferVisible, setOfferVisible] = useState<boolean>(true);

  const getOffers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASEURL}/offers/`, {
        headers: {
          accept: "application/json",
        },
      });
      const data = response?.data.map((offer: Offer) => ({
        ...offer,
        image_base64: offer.image_base64.startsWith("data:image")
          ? offer.image_base64
          : `data:image/jpeg;base64,${offer.image_base64}`,
      }));
      setOffers(data.length > 0 ? data : dummyOffers);
      const visibleData = data?.filter((ele: any) => ele?.visible === true);
      setOfferVisible(visibleData?.length === data?.length);
    } catch (error) {
      message.error("Unable to fetch offers. Using fallback data.");
      console.error(error);
      setOffers(dummyOffers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      {" "}
      {isOfferVisible && (
        <div className="offer-section">
          {offers.length !== 0 && (
            <h1 className="offer-title">EXCLUSIVE OFFERS</h1>
          )}
          {loading ? (
            <div className="loading-container">
              <Spin size="large" />
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="offer-masonry-grid"
              columnClassName="offer-masonry-grid_column"
            >
              {offers.map((offer) => (
                <div className="offer-card" key={offer.id}>
                  <img
                    src={offer.image_base64}
                    alt={offer.title}
                    className="offer-image"
                  />
                  <div className="offer-content">
                    <h2 className="offer-card-title">{offer.title}</h2>
                    <p className="offer-description">{offer.description}</p>
                    <p className="offer-discount">
                      {offer.discount_percentage}% Off
                    </p>
                    <p className="offer-validity">
                      Valid: {new Date(offer.valid_from).toLocaleDateString()} -{" "}
                      {new Date(offer.valid_until).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </Masonry>
          )}
        </div>
      )}
    </>
  );
};

export default OfferSection;
