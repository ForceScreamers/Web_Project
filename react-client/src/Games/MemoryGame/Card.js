import React from "react";
import classnames from "classnames";
import "./card.scss";
import image from './images/image.jpg'

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled, cardType }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card-resize-animation border-0 card row align-items-center justify-content-center ", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face row align-items-center justify-content-center">
        {/*Disable pointer when the card is inactive*/}

        <img className="card-image" src={image} alt="front" style={{ cursor: isInactive ? "default" : "pointer" }} />


      </div>

      <div className="card-face card-back-face">
        {/* <img src={card.image} alt="back" /> */}
        <label className="card-back-face-label">{cardType}</label>
      </div>
    </div>
  );
};

export default Card;
