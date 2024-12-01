import ProductItem from "../components/ProductItem";
import "../layout/CartItem.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Items: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Product[]>("/api/products");
      console.log(response.data);

      const transformedProducts: Product[] = response.data.map((item: any) => ({
        id: item.item_id,
        name: item.item_name,
        price: parseFloat(item.item_price),
        description: item.item_description,
        image: item.images?.[0] || "",
      }));

      if (Array.isArray(transformedProducts)) {
        setProducts(transformedProducts);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to fetch prodcts", error);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-products">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <h1 className="section-title">The most popular</h1>
          </div>
        </div>
        <div className="row">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            products.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Items;
