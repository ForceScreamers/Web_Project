import { Card } from "react-bootstrap";

export default function MatchCard({ Text, OnClick, IsSelected, Index }) {
  return (
    <Card onClick={() => OnClick(Index)} style={{ cursor: "pointer" }} bg={IsSelected ? "success" : "secondary"} >
      <Card.Body >
        {Text}
      </Card.Body>
    </Card>
  );
};

