import React, { useState, useEffect } from "react";
import axios from "axios";
import Bottom from "../components/bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import "../layout/wishlist.css";
import LikedItem from "../components/LikedItem";

interface WishlistItem {
  item_id: number;
}

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
}
interface LikedItemData extends ProductDetails {
  item_id: number;
  item_name: string;
  unit_price: string;
  images: string[];
}

const Wishlist: React.FC = () => {
  const [likedItems, setLikedItems] = useState<LikedItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWishlistAndProducts();
  }, []);

  const fetchWishlistAndProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const wishlistResponse = await axios.get<WishlistItem[]>(
        "/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!Array.isArray(wishlistResponse.data)) {
        throw new Error("Invalid basket response format");
      }

      const productDetailsPromises = wishlistResponse.data.map(async (item) => {
        const productResponse = await axios.get<ProductDetails>(
          `/api/products/${item.item_id}`
        );
        return {
          ...productResponse.data,
        };
      });

      const likedItemData: any = await Promise.all(productDetailsPromises);
      setLikedItems(likedItemData);
    } catch (error) {
      console.error("Failed to fetch basket and products.", error);
      setError("Failed to fetch basket and products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Product
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`/api/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.message === "item removed") {
        setLikedItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete item. Please try again.", error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  console.log(likedItems[0]);
  return (
    <div className="wishlist-cart">
      <div className="title">Liked products</div>

      {likedItems.length > 0 ? (
        likedItems.map((item) => (
          <LikedItem
            key={item.id}
            onDelete={() => handleDelete(item.item_id)}
            item_price={0}
            {...item}
          />
        ))
      ) : (
        <div>
          <FontAwesomeIcon icon={outlineHeart} size="2x" color="gray" />
          <h5 className="text-center text-gray-500">
            Your favorite list is empty.
          </h5>
          <p> When you like your favorite products.you can find them here.</p>
        </div>
      )}

      {likedItems.length > 0 && (
        <div className="checkout-button-container">
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )}

      <footer className="bottom-nav">
        <Bottom />
      </footer>
    </div>
  );
};

export default Wishlist;
