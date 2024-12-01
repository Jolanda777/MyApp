import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import axios from "axios";
import Bottom from "../components/bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../layout/shoppingCart.css";
import { Link } from "react-router-dom";
interface BasketItem {
  item_id: number;
  quantity: number;
  unit_price: string;
}

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
}

interface CartItemData extends ProductDetails {
  quantity: number;
  item_id: number;
  unit_price: string;
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBasketAndProducts();
  }, []);

  const fetchBasketAndProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const basketResponse = await axios.get<BasketItem[]>("/api/basket", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!Array.isArray(basketResponse.data)) {
        throw new Error("Invalid basket response format");
      }

      const productDetailsPromises = basketResponse.data.map(async (item) => {
        const productResponse = await axios.get<ProductDetails>(
          `/api/products/${item.item_id}`
        );
        return {
          ...productResponse.data,
          price: parseFloat(item.unit_price as unknown as string),
          quantity: item.quantity,
        };
      });

      const cartItemsData: any = await Promise.all(productDetailsPromises);
      setCartItems(cartItemsData);
    } catch (error) {
      console.error("Failed to fetch basket and products.", error);
      setError("Failed to fetch basket and products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // Increase Product
  const handleIncrease = async (id: number) => {
    try {
      const item = cartItems.find((item) => item.item_id === id);
      console.log(item);
      if (!item) return;

      const response = await axios.put(
        `/api/basket/`,
        JSON.stringify({
          // Daten in JSON konvertieren
          item_id: item.item_id,
          quantity: item.quantity + 1,
        }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Basket item updated") {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.item_id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to increase item quantity. Please try again.",
        error
      );
    }
  };

  // DEcrease Product

  const handleDecrease = async (id: number) => {
    try {
      const item = cartItems.find((item) => item.item_id === id);
      console.log(item);
      if (!item || item.quantity <= 1) return;

      const response = await axios.put(
        `/api/basket/`,
        JSON.stringify({
          // Daten in JSON konvertieren
          item_id: item.item_id,
          quantity: item.quantity - 1,
        }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Basket item updated") {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.item_id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to decrease item quantity. Please try again.",
        error
      );
    }
  };
  // Delete Product
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`/api/basket/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.message === "Basket item removed") {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.item_id !== id)
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
  console.log(cartItems[0]);
  return (
    <div className="shopping-cart">
      <div className="title">Shopping Bag</div>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            item_name={""}
            item_price={0}
            key={item.id}
            {...item}
            onIncrease={() => handleIncrease(item.item_id)}
            onDecrease={() => handleDecrease(item.item_id)}
            onDelete={() => handleDelete(item.item_id)}
          />
        ))
      ) : (
        <h5 className="text-center text-gray-500">
          Your shopping bag is empty.
          <FontAwesomeIcon icon={faShoppingCart} size="2x" color="gray" />
        </h5>
      )}

      <div className="mt-4 text-right">
        <p className="text-xl font-bold">
          Total: €
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
      </div>
      <div className="action">
        <button type="button">
          <Link to="/checkout"> Checkout </Link>
        </button>
      </div>

      <footer className="bottom-nav">
        <Bottom />
      </footer>
    </div>
  );
};

export default ShoppingCart;
