import { Card, Button, Accordion } from "react-bootstrap";
import CustomAccordionToggle from "./CustomAccordionToggle"
import { useHistory } from "react-router-dom";

import { GAMES_PATH_PREFIX } from "../../../Constants";

export default function GamePreviewCard({ GamePath, Name, PreviewImage, Description }) {
  const history = useHistory();


  return (
    <div>
      <Accordion>
        <Card bg='light'>
          <Card.Header className='d-flex align-items-center justify-content-center '>
            <Card.Img src={PreviewImage} />
          </Card.Header>
          <Card.Body  >
            <Card.Title>{Name + " "}</Card.Title>

            <div className="d-grid text-center p-1">
              <Button onClick={() => history.push(GAMES_PATH_PREFIX + GamePath)} variant="success" size="sm" >שחק!</Button>
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
