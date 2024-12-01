import React from "react";
import "../layout/user.css";
import Bottom from "../components/bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const User: React.FC = () => {
  return (
    <div className="user-card">
      <div className="logo">
        <div className="logo-circle">
          <span>logo</span>
        </div>
        <h1>Mangaspot</h1>
      </div>
      {/*Detail for user -> button  */}
      <div className=" button">
        <button>
          <div className="icon1"></div>
          <FontAwesomeIcon icon={faUser} />
          <span className="text">Personal detail</span>
          <span className=" linie "></span>
        </button>

        <button>
          <div className="icon2"></div>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="text">My orders</span>
          <span className=" linie "></span>
        </button>

        <button>
          <div className="icon3"></div>
          <FontAwesomeIcon icon={faUsers} />
          <span className="text">About us</span>
          <span className=" linie "></span>
        </button>
      </div>
      <footer className="bottom-nav">
        <Bottom />
      </footer>
    </div>
  );
};

export default User;
