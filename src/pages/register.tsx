import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  //faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../layout/register.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is not required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is not required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is not required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/register", {
        name: formData.username,
        email_address: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      console.log("Registration successful:", response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        if (errorMessage === "Invalid email address") {
          setErrors({ ...errors, email: errorMessage });
        } else if (errorMessage === "Password is not strong enough") {
          setErrors({ ...errors, password: errorMessage });
        } else if (errorMessage === "Passwords do not match") {
          setErrors({ ...errors, confirmPassword: errorMessage });
        } else {
          setErrors({
            ...errors,
            general: "Registration failed. Please try again.",
          });
        }
      } else {
        setErrors({
          ...errors,
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-card">
      <div className="logo">
        <div className="logo-circle">
          <img src="/assets/image.png" alt="Logo" />
        </div>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Register</h2>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && (
            <span className="error-message">
              <FontAwesomeIcon icon={faExclamationCircle} /> {errors.username}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">
              <FontAwesomeIcon icon={faExclamationCircle} /> {errors.email}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-message">
              <FontAwesomeIcon icon={faExclamationCircle} /> {errors.password}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-message">
              <FontAwesomeIcon icon={faExclamationCircle} />{" "}
              {errors.confirmPassword}
            </span>
          )}
        </div>
        {errors.general && (
          <div className="error-message general-error">
            <FontAwesomeIcon icon={faExclamationCircle} /> {errors.general}
          </div>
        )}
        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
