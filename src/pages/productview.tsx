import React from "react";
import "../layout/productview.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Productview: React.FC<ProductItemProps> = ({
  id,
  name,
  price,
  description,
  image,
}) => {
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "/api/basket",
        { item_id: id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message === "Item added to basket") {
        alert("Item added to cart successfully!");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleAddToWishlist = () => {
    alert("Item added to wishlist!");
  };

  return (
    <main>
      <div className="card">
        <div id={`product-${id}`} className="card__title">
          <div className="icon">
            <a href="#">
              <FontAwesomeIcon icon={faArrowLeft} />
            </a>
          </div>
          <h3>New products</h3>
        </div>

        <div className="card__body">
          <div className="half">
            <div className="featured_text">{name}</div>
          </div>

          <div
            className="image"
            style={{
              backgroundImage: `url(${image || "/placeholder.svg"})`,
            }}
          ></div>

          <div className="half">
            <p className="description">{description}</p>
            <span className="stock">
              <i className="fa fa-pen"></i> In stock
            </span>

            <div className="reviews">
              <span>(64 reviews)</span>
            </div>
          </div>
        </div>

        <div className="card__footer">
          <h4 className="price">{price.toFixed(2)} Euro</h4>
        </div>
        <div className="action-buttons">
          <button className="add-to-wishlist-btn" onClick={handleAddToWishlist}>
            <FontAwesomeIcon icon={faHeart} />
          </button>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Productview;
