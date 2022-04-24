import { Card, Button, Accordion } from "react-bootstrap";
import CustomAccordionToggle from "./CustomAccordionToggle"
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { GAMES_PATH_PREFIX } from "../../../Constants";

import { GAME_DIFFICULTY } from "../../../Constants";

export default function GamePreviewCard({ GamePath, Name, GameId, PreviewImage, Description, ChangeDifficulty, SelectedDifficulty }) {
  const history = useHistory();




  return (
    <div>
      <Accordion>
        <Card bg='light' style={{ borderRadius: "0px" }}>

          <Card.Body  >
            <Card.Title>
              <Card.Img src={PreviewImage} />
              <br />
              <br />

              <div className="d-flex justify-content-around">
                {Name + " "}
                <div>
                  <SelectDifficultyButtons GameId={GameId} ChangeDifficulty={ChangeDifficulty} SelectedDifficulty={SelectedDifficulty} />
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

function SelectDifficultyButtons({ SelectedDifficulty, ChangeDifficulty, GameId }) {

  return (
    <div>
      <DifficultyButton GameId={GameId} SelectedDifficulty={SelectedDifficulty} ChangeDifficulty={ChangeDifficulty} Variant="success" Text="קל" Difficulty={GAME_DIFFICULTY.EASY} />
      <DifficultyButton GameId={GameId} SelectedDifficulty={SelectedDifficulty} ChangeDifficulty={ChangeDifficulty} Variant="warning" Text="בינוני" Difficulty={GAME_DIFFICULTY.MEDIUM} />
      <DifficultyButton GameId={GameId} SelectedDifficulty={SelectedDifficulty} ChangeDifficulty={ChangeDifficulty} Variant="danger" Text="קשה" Difficulty={GAME_DIFFICULTY.HARD} />
    </div>
  )
}

function DifficultyButton({ Text, Variant, SelectedDifficulty, ChangeDifficulty, Difficulty, GameId }) {
  console.log(SelectedDifficulty)

  return (
    <Button
      onClick={() => ChangeDifficulty(GameId, Difficulty)}
      style={{ outline: "none", boxShadow: "none", marginLeft: "20px", border: Difficulty === SelectedDifficulty ? "solid black 2px" : "", color: Difficulty === SelectedDifficulty ? "black" : "white" }}
      variant={Variant}
      size="sm"
    >
      {Text}
    </Button>
  )
}

