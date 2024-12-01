// HomeWithoutLogin

import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faSearch,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "../layout/home.css";
import Items from "../pages/Items";

const ThemeToggleButton: React.FC<{
  theme: string;
  toggleTheme: () => void;
}> = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className="btn btn-light">
      <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
    </button>
  );
};

const NavButton: React.FC<{
  icon: any;
  onClick: () => void;
}> = ({ icon, onClick }) => (
  <button className="btn btn-light" onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

const HomeWithouLogin: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }, [theme]);

  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (path: string) => navigate(path),
    [navigate]
  );

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const carouselItems = [
    {
      imgSrc: "https://img.anime2you.de/2024/10/tensura1.jpg",
      altText: " ",
      captionTitle: " ",
      captionText: " ",
    },
    {
      imgSrc: "https://img.anime2you.de/2024/11/tomb-raider-king.jpg",
      altText: " ",
      captionTitle: " ",
      captionText: "",
    },
    {
      imgSrc: "https://img.anime2you.de/2024/08/oshi-no-ko-5.jpg",
      altText: " ",
      captionTitle: " ",
      captionText: " ",
    },
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <button onClick={toggleSearch} className="btn btn-light">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {isSearchVisible && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
        )}
        <h1 className="greeting">Mangaspot</h1>

        <NavButton
          icon={faUserCog}
          onClick={() => handleNavigation("/login")}
        />

        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </header>
      <h3>Filter by Genre</h3>
      <nav className="main-nav">
        <p>
          <button className="btn btn-light">Adventure</button>
        </p>
        <p>
          <button className="btn btn-light">Fantasy</button>
        </p>
        <p>
          <button className="btn btn-light">Drama</button>
        </p>
      </nav>

      <div className="carousel-container">
        <Carousel>
          {carouselItems.map((item, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={item.imgSrc}
                alt={item.altText}
              />
              <Carousel.Caption>
                <h3>{item.captionTitle}</h3>
                <p>{item.captionText}</p>
              </Carousel.Caption>
              <p>♥️Coming soon we appreciate your patience.♥️</p>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="product-section">
        <Items />
      </div>
    </div>
  );
};

export default HomeWithouLogin;
