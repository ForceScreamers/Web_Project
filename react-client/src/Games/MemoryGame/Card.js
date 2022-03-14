import React from "react";
import classnames from "classnames";
import "./card.scss";
import image from './images/image.jpg'

const Card = ({ OnClick, Index, IsInactive, IsFlipped, IsDisabled, Type, Caption }) => {
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

        <img className="card-image image-border" src={image} alt="front" style={{ cursor: IsInactive ? "default" : "pointer" }} />


      </div>

      <div className="card-face card-back-face">
        {/* <img src={card.image} alt="back" /> */}
        {/* <label className="card-back-face-label">{cardType}</label> */}


        {

          Type === "text"
            ?

            <div className="d-flex justify-content-center align-items-center">
              <label className="card-label" style={{ cursor: CursorSelector() }}>{Caption.value}</label>
            </div>

            : Type === "image"
              ? <img src={Caption.value} alt="card-face" className="card-back-face-label image-border" />
              : <></>
        }





      </div>
    </div>
  );
};

export default Card;
