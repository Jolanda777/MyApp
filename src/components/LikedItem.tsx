import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../layout/LikedItem.css";

interface LikedItemProps {
  item_id: number;
  item_name: string;
  item_price: number;
  images: string[];
  onDelete: (id: number) => void;
}

const LikedItem: React.FC<LikedItemProps> = ({
  item_id,
  item_name,
  item_price,
  images,
  onDelete,
}) => {
  // Heart click handler (placeholder functionality)

  /* const handleHeartClick = (itemId: number) => {
    console.log(`Heart clicked for item ${itemId}`);
  };*/

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="single-product">
        {/* Product Image and Link */}
        <Link to={`/products/${item_id}`}>
          <div
            className="part-1"
            style={{
              position: "relative",
              backgroundImage: `url(${images[0] || "/placeholder.svg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/*  Heart Button 
            <button
              className={`heart-button ${item_id ? "liked" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleHeartClick(item_id);
              }}
            >
              <FontAwesomeIcon icon={outlineHeart} />
            </button>
            */}
          </div>
        </Link>

        {/* Product Details */}
        <div className="part-2">
          <h3 className="product-title">{item_name}</h3>
          <h4 className="product-price">€ {item_price}</h4>

          {/* Delete Button */}
          <button onClick={() => onDelete(item_id)} className="delete-button">
            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default LikedItem;
