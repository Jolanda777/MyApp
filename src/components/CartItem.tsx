import React from "react";
import { Link } from "react-router-dom";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import LikeButton from "./LikeButton";

interface BasketItem {
  item_id: number;
  item_name: string;
  item_price: number;
  quantity: number;
  images: string[];
}

interface CartItemProps extends BasketItem {
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item_id,
  item_name,
  item_price,
  quantity,
  images,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  // Heart click handler (placeholder functionality)
  {
    /* const handleHeartClick = (itemId: number) => {
    console.log(`Heart clicked for item ${itemId}`);
  };*/
  }

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

          {/* Quantity Control */}
          <div className="product-quantity">
            <button
              onClick={() => onDecrease(item_id)}
              disabled={quantity <= 1}
              className="quantity-button"
            >
              <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
            </button>
            <span className="quantity-display">{quantity}</span>

            <button
              onClick={() => onIncrease(item_id)}
              className="quantity-button"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            </button>
          </div>

          {/* Total Price */}
          <div className="product-total">Total: € {item_price * quantity}</div>

          {/* Delete Button */}
          <button onClick={() => onDelete(item_id)} className="delete-button">
            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
