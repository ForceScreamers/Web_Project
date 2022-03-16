import React from "react";
import classnames from "classnames";
import "./card.scss";
import image from './images/image.jpg'

const Card = ({ OnClick, Index, IsInactive, IsFlipped, IsDisabled, Caption, Card }) => {
  const handleClick = () => {
    !IsFlipped && !IsDisabled && OnClick(Index);
  };

  function CursorSelector() {
    return IsInactive ? "default" : "pointer";
  }

  return (
    <div
      className={classnames("card-resize-animation border-0 card row align-items-center justify-content-center ", {
        "is-flipped": IsFlipped,
        "is-inactive": IsInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face row align-items-center justify-content-center">
        {/*Disable pointer when the card is inactive*/}

        <img className="card-image image-border" src={Card.value.backImage} alt="front" style={{ cursor: IsInactive ? "default" : "pointer" }} />


      </div>

      <div className="card-face card-back-face">
        {/* <img src={card.image} alt="back" /> */}
        {/* <label className="card-back-face-label">{cardType}</label> */}


        <div>
          <img src={Caption.frontImage} alt="card-face" className="card-back-face-label image-border" />
          <p style={{ zIndex: 100, position: 'absolute', top: '30%', left: '30%', fontSize: '2.5vh' }}>{Caption.value}</p>
        </div>






      </div>
    </div>
  );
};

export default Card;
