import { Card, Button, Accordion } from "react-bootstrap";
import CustomAccordionToggle from "./CustomAccordionToggle"
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { GAMES_PATH_PREFIX } from "../../../Constants";

export default function GamePreviewCard({ GamePath, Name, PreviewImage, Description, SetDifficultyLevel }) {
  const history = useHistory();

  return (
    <div>
      <Accordion>
        <Card bg='light'>
          <Card.Header className='d-flex align-items-center justify-content-center '>
            <Card.Img src={PreviewImage} />
          </Card.Header>
          <Card.Body  >
            <Card.Title>

              <div className="d-flex justify-content-around">
                {Name + " "}
                <div>
                  <Button style={{ marginLeft: "20px" }} size="sm" variant="success">קל</Button>
                  <Button style={{ marginLeft: "20px", color: "white" }} size="sm" variant="warning">בינוני</Button>
                  <Button style={{ marginLeft: "20px" }} size="sm" variant="danger">קשה</Button>
                </div>
              </div>
            </Card.Title>

            <div className="d-grid text-center p-1">
              <Button onClick={() => history.push(GAMES_PATH_PREFIX + GamePath)} variant="primary" size="sm" >שחק!</Button>
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

    </div>
  )
}
