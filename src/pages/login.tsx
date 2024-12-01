import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../layout/login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  // Init navigate
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post<{ token: string }>(
        "http://localhost:3000/api/auth/login",
        {
          email_address: email,
          password: password,
        }
      );

      // login success：storage token
      const { token } = response.data;
      localStorage.setItem("token", token);

      console.log("Login success:", response.data);
      navigate("/home");
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <div className="logo-circle">
          <img src="/assets/image.png" alt="Logo" />
        </div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        {" "}
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* hier show error information */}
        <div className="login-links">
          <Link to="/register">No account yet?</Link>
          <Link to="/forgotpasswor">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
