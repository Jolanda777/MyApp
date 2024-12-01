import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Detail: React.FC<ProductItemProps> = ({
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

  const handleAddToWishlist = async (id: number) => {
    try {
      const response = await axios.post(
        "/api/wishlist",
        { item_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message === "Item added to wishlist") {
        alert("Item added to wishlist successfully!");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
      alert("Failed to add item to wishlist. Please try again.");
    }
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div id={`product-${id}`} className="single-product">
        {/* Link  für Bild und botten  */}
        <div
          className="part-1"
          style={{
            position: "relative",
            backgroundImage: `url(${image || "/placeholder.svg"})`,
          }}
        ></div>

        {/* button ❤️  and button shoppingCart */}
        <div className="part-2">
          <h3 className="product-title">{name}</h3>
          <h4 className="product-price">{price.toFixed(2)} Euro</h4>
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToWishlist(id)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <p className="product-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
