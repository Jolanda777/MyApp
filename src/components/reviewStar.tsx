import React from "react";
import "../layout/reviewStar.css";

interface StarRatingProps {
  onRatingChange?: (rating: number | null) => void;
  currentRating?: number | null;
}

const ReviewStar: React.FC<StarRatingProps> = ({
  onRatingChange,
  currentRating,
}) => {
  const handleRating = (value: number) => {
    onRatingChange?.(value);
  };

  return (
    <div className="star-rating">
      <svg style={{ display: "none" }}>
        <linearGradient x1="50%" y1="5.4%" x2="87.5%" y2="65.5%" id="grad">
          <stop stopColor="#bf209f" offset="0%" />
          <stop stopColor="#d62a9d" offset="60%" />
          <stop stopColor="#ED009E" offset="100%" />
        </linearGradient>
        <symbol id="star" viewBox="153 89 106 108">
          <polygon
            stroke="black"
            strokeWidth="2"
            fill="currentColor"
            points="206 162.5 176.61 185.45 189.36 150.41 158.45 129.55 195.71 130.84 206 95 216.29 130.84 253.55 129.55 222.64 150.41 235.39 185.45"
          />
        </symbol>
      </svg>

      <div className="star-container">
        {[5, 4, 3, 2, 1].map((value) => (
          <React.Fragment key={value}>
            <input
              type="radio"
              name="star"
              id={`star-${value}`}
              checked={currentRating === value}
              onChange={() => handleRating(value)}
            />
            <label htmlFor={`star-${value}`}>
              <svg className="star">
                <use href="#star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ReviewStar;
