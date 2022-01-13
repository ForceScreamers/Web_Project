import { Card, Button } from "react-bootstrap";


export default function GamePreviewCard({ Name, PreviewImage, Description }) {
  return (
    <div>
      {/*//TODO: FINISH CARD STYLES*/}
      <Card style={{ flexDirection: }}>

        <Card.Body>
          <Card.Img src={PreviewImage} style={{ width: 100 }} />
          <Card.Title>{Name}</Card.Title>

          <Button>עוד פרטים</Button>
          <Card.Text>היי פה כתוב עוד פרטים איזה</Card.Text>

          <Button>שחק!</Button>

        </Card.Body>
      </Card>
    </div>
  )
}
