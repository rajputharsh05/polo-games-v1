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

const OfferSection = () => {
    const BASEURL = import.meta.env.VITE_BASEURL;
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
            setOffers(data);
        } catch (error) {
            message.error("Unable to fetch offers. Please try again later.");
            console.error(error);
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
        <div className="offer-section">
            { offers.length !== 0 && <h1 className="offer-title">Exclusive Offers</h1> } 
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
                                <p className="offer-discount">{offer.discount_percentage}% Off</p>
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
    );
};

export default OfferSection;