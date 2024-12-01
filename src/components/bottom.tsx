import "../layout/bottom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const handleNavigation = (path: string) => {
  window.location.href = path;
};

const Bottom: React.FC = () => {
  return (
    <footer className="bottom-nav">
      <div className="nav-button" onClick={() => handleNavigation("/home")}>
        <FontAwesomeIcon icon={faHome} />
      </div>

      <div className="nav-button" onClick={() => handleNavigation("/Wishlist")}>
        <FontAwesomeIcon icon={faHeart} />
      </div>

      <div
        className="nav-button"
        onClick={() => handleNavigation("/ShoppingCart")}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
      <div className="nav-button" onClick={() => handleNavigation("/User")}>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </footer>
  );
};

export default Bottom;
