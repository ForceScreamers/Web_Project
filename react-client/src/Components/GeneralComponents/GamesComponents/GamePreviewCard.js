import { Card, Button, Accordion } from "react-bootstrap";
import CustomAccordionToggle from "./CustomAccordionToggle"
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { GAMES_PATH_PREFIX } from "../../../Constants";

import { GAME_DIFFICULTY } from "../../../Constants";

import './GamePreviewStyles.css'

export default function GamePreviewCard({ GamePath, Name, GameId, PreviewImage, Description, Topics, ChangeDifficulty, SelectedDifficulty }) {
  const history = useHistory();

  const [topicsToDisplay, setTopicsString] = useState(() => FormatTopicsString());
  console.log(GamePath);
  //  Returns a string with the topic names and a colon between then, except for the last topic
  function FormatTopicsString() {
    let topics_string = "";

    if (Topics) {
      for (let topic of Topics) {
        topics_string = topics_string.concat(topic);

        if (Topics.indexOf(topic) !== Topics.length - 1) { // Last topic
          topics_string = topics_string.concat(", ");
        }
      }
    }
    return topics_string;
  }

  return (
    <div>
      <Card className="game-preview-card">

        <Card.Body>
          <div className="d-flex flex-row">

            <div className="game-card-image-container">
              <img className="game-card-image" alt="game-preview" src={PreviewImage} />
            </div>


            <div className="d-flex justify-content-around align-items-center flex-column">
              <div>
                {Name}
              </div>
              <SelectDifficultyButtons GameId={GameId} ChangeDifficulty={ChangeDifficulty} SelectedDifficulty={SelectedDifficulty} />
              <div style={{ marginTop: "20px" }}>
                {Description}
              </div>
              <div>
                <div className="d-grid text-center p-1">
                  <Button onClick={() => history.push(GAMES_PATH_PREFIX + GamePath)} variant="primary" size="sm" >שחק!</Button>
                </div>
              </div>
            </div>

          </div>

          <div>
            <label>{topicsToDisplay}</label>
          </div>

        </Card.Body>
      </Card>

    </div>
  )
}

function SelectDifficultyButtons({ SelectedDifficulty, ChangeDifficulty, GameId }) {

  return (
    <div className='d-flex flex-row'>
      <DifficultyButton GameId={GameId} SelectedDifficulty={SelectedDifficulty} ChangeDifficulty={ChangeDifficulty} BackgroundColor="#0DFF35" Text="קל" Difficulty={GAME_DIFFICULTY.EASY} />
      <DifficultyButton GameId={GameId} SelectedDifficulty={SelectedDifficulty} ChangeDifficulty={ChangeDifficulty} BackgroundColor="#F4B700" Text="בינוני" Difficulty={GAME_DIFFICULTY.MEDIUM} />
      <DifficultyButton GameId={GameId} SelectedDifficulty={SelectedDifficulty} ChangeDifficulty={ChangeDifficulty} BackgroundColor="#FF1212" Text="קשה" Difficulty={GAME_DIFFICULTY.HARD} />
    </div>
  )
}

function DifficultyButton({ Text, Variant, SelectedDifficulty, ChangeDifficulty, Difficulty, GameId, BackgroundColor }) {
  console.log(SelectedDifficulty)
  return (
    <Button
      onClick={() => ChangeDifficulty(GameId, Difficulty)}
      className="game-difficulty-button"
      style={{ backgroundColor: BackgroundColor, border: Difficulty === SelectedDifficulty ? "solid black 3px" : "solid white 2px", color: Difficulty === SelectedDifficulty ? "black" : "white" }}
      variant={Variant}
      size="sm"
    >
      {Text}
    </Button>
  )
}
