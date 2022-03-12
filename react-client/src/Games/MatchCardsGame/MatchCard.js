import './MatchCardStyles.scss';
import classnames from "classnames";

import { Card } from "react-bootstrap";

export default function MatchCard({ IsSelected, IsDisabled, IsInactive, Caption, OnClick, Index, Type }) {
  const handleClick = () => {
    !IsSelected && !IsDisabled && !IsInactive && OnClick(Index);
  };

  function CursorSelector() {
    return IsInactive ? "default" : "pointer";
  }


  return (
    <Card className={
      classnames("match-card row align-items-center justify-content-center", {
        // "is-flipped": IsFlipped,
        "match-card-active": IsSelected,
        "match-card-inactive": IsInactive,
        "no-border": Type === "image"
      })
    } onClick={handleClick} style={{ cursor: CursorSelector() }} >



      {

        Type === "text"
          ?


          <Card.Body className="d-flex justify-content-center align-items-center">
            <label className="card-label" style={{ cursor: CursorSelector() }}>{Caption.value}</label>
          </Card.Body>

          : Type === "image"
            ? <img src={Caption.value} alt="card-face" className="match-card-image" />
            : <></>
      }

    </Card>
  );
};