//import React, { useState } from "react";
import "../layout/forgotPasswort.css";
import { FormEvent } from "react";
import "../layout/register.css";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  function handleSubmit(_event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="forgotpassword-card">
      <div className="logo">
        <div className="logo-circle">
          <img src="/assets/image.png" alt="Logo" />
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {" "}
        <h2>Forgot your Password?</h2>
        <p>Please write your email address to reset your password.</p>
        <input type="email" placeholder="Email" className="input-field" />
        <Link to="/" className="button">
          Send
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
