import { Card, Button } from "react-bootstrap";


export default function GamePreviewCard({ Name, PreviewImage, Description }) {
  return (
    <div>
      {/*//TODO: FINISH CARD STYLES*/}
      <Card >

        <Card.Img variant='top' src={PreviewImage} />
        <Card.Body className='d-flex flex-column align-items-start justify-content-start' >
          <Card.Title>{Name}</Card.Title>
          <Button className='' size="sm" >שחק!</Button>

          <Button size="sm">עוד פרטים</Button>
          <Card.Text>היי פה כתוב עוד פרטים איזה</Card.Text>


        </Card.Body>
      </Card>

      {/* <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a
          </Card.Text>
        </Card.Body>
      </Card> */}
    </div>
  )
}
