import React from 'react';
import Masonry from 'react-masonry-css';
import { Card } from 'antd';
import "./offer.css";

interface Offer {
  id: number;
  title: string;
  description: string;
  discount_percentage: number;
  valid_from: string;
  valid_until: string;
  image_base64: string;
}

const offers: Offer[] = [
  // Replace this with your fetched data
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Get 50% off on all items!',
    discount_percentage: 50,
    valid_from: '2025-01-01',
    valid_until: '2025-01-31',
    image_base64: 'data:image/png;base64,...', // Example base64 image
  },
  // Add more offers here
];

const OfferSection: React.FC = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {offers.map((offer) => (
        <Card
          key={offer.id}
          hoverable
          cover={<img alt={offer.title} src={offer.image_base64} />}
          style={{ margin: '8px' }}
        >
          <Card.Meta
            title={offer.title}
            description={
              <>
                <p>{offer.description}</p>
                <p>
                  Discount: {offer.discount_percentage}%<br />
                  Valid Until: {new Date(offer.valid_until).toLocaleDateString()}
                </p>
              </>
            }
          />
        </Card>
      ))}
    </Masonry>
  );
};

export default OfferSection;
