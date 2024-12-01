import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import "../layout/icon.css";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ThemeToggleButton: React.FC<ProductItemProps> = ({ id }) => {
  const [theme, setTheme] = useState("unlike");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "unlike";
    setTheme(savedTheme);
  }, []);

  // add to wishlist
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

  // remove from wishlist
  const handleRemoveFromWishlist = async (id: number) => {
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

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "unlike" ? "like" : "unlike";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "like") {
      handleAddToWishlist(id);
    } else {
      handleRemoveFromWishlist(id);
    }
  }, [theme, id]);

  return (
    <button onClick={toggleTheme} className="heart-icon">
      <FontAwesomeIcon icon={theme === "like" ? solidHeart : outlineHeart} />
    </button>
  );
};

export default ThemeToggleButton;
