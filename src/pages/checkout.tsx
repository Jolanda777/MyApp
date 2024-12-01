import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../layout/checkout.css";
import axios from "axios";

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zip: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseSavedAddress(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      cardNumber: formData.cardNumber,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      useSavedAddress,
      newAddress: useSavedAddress
        ? undefined
        : {
            street_num: formData.street,
            city: formData.city,
            postal_code: formData.zip,
            country: formData.country,
          },
    };

    try {
      const response = await axios.post("/api/payments/checkout", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPaymentStatus(response.data.message || "Payment successful");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle known API errors
        setPaymentStatus(error.response.data.message || "Payment failed");
      } else {
        // Handle network or other errors
        setPaymentStatus("An error occurred. Please try again.");
      }
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>
          <i className="fas fa-shipping-fast"></i>
          Checkout Details
        </h1>

        <div className="street">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            disabled={useSavedAddress}
          />
        </div>
        <div className="address-info">
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={useSavedAddress}
            />
          </div>
          <div>
            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              disabled={useSavedAddress}
            />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              disabled={useSavedAddress}
            />
          </div>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={useSavedAddress}
              onChange={handleCheckboxChange}
            />
            Use saved address
          </label>
        </div>

        <h1>
          <i className="far fa-credit-card"></i> Payment
        </h1>
        <div className="cc-num">
          <label htmlFor="cardNumber">Card Nr.</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="cc-info">
          <div>
            <label htmlFor="expiryDate">Exp</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="cvv">CCV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="btns">
          <button type="submit">Pay</button>
          <button type="button">
            <Link to="/shoppingcart"> Back </Link>
          </button>
        </div>
      </form>

      {paymentStatus && (
        <p
          className={`payment-status ${
            paymentStatus.toLowerCase().includes("success")
              ? "success"
              : "error"
          }`}
        >
          {paymentStatus}
        </p>
      )}
    </div>
  );
};

export default Checkout;
