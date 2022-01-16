import { Card, Button, Container, Accordion } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CustomAccordionToggle from "./CustomAccordionToggle"

export default function GamePreviewCard({ HandlePlay, Name, PreviewImage, Description, GameId }) {

  const history = useHistory();

  const HandleGameClick = () => {
    history.push("/")
  }

  return (
    <div>
      {/*//TODO: FINISH CARD STYLES*/}
      <Accordion>
        <Card bg='light'>
          <Card.Header className='d-flex align-items-center justify-content-center '>
            <Card.Img src={PreviewImage} />
          </Card.Header>
          <Card.Body  >
            <Card.Title>{Name + " "}</Card.Title>

            <div className="d-grid text-center p-1">
              <Button onClick={() => HandlePlay(GameId)} variant="success" size="sm" >שחק!</Button>
            </div>

            <div className='d-flex flex-column align-items-start justify-content-start'>
              <CustomAccordionToggle variant="link" eventKey="0" size="sm">עוד פרטים</CustomAccordionToggle>
            </div>


          </Card.Body>

          <Accordion.Collapse eventKey="0">
            <Card.Footer>
              {Description}
            </Card.Footer>
          </Accordion.Collapse>


        </Card>
      </Accordion>
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
