import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ShowScoreModal from "./ShowScoreModal";

const SECONDS_TO_COMPLETE = 60;

export default function GameTemplate({ EndGame, GameId, GameComponent, ExitGame, CardsJSON, GameName }) {


  const [secondsLeft, setSecondsLeft] = useState(SECONDS_TO_COMPLETE);
  const [moves, setMoves] = useState(0);

  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (!secondsLeft) return;

    const intervalId = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearTimeout(intervalId);

  }, [secondsLeft]);

  function ResetTimer() {
    setSecondsLeft(SECONDS_TO_COMPLETE);
  }

  useEffect(() => {
    if (hasEnded === true) {
      EndGame(CalculateGameScore(), GameId);
    }
  }, [hasEnded])



  function CalculateGameScore() {
    let completionTime = SECONDS_TO_COMPLETE - secondsLeft;
    let score = 0;

    if (completionTime >= 0 && completionTime < 15)
      score = 5;
    else if (completionTime >= 15 && completionTime < 30)
      score = 4;
    else if (completionTime >= 30 && completionTime < 45)
      score = 3;
    else if (completionTime >= 45 && completionTime < 60)
      score = 2;
    else
      score = 1;
    return score;
  }

  function ForceEndGame() {
    EndGame(CalculateGameScore(), GameId)
  }


  return (
    <div>
      <Button onClick={() => ForceEndGame()}>debug exit</Button>
      <Button onClick={() => ResetTimer()}>ריסטרט</Button>
      <div className="score d-flex flex-row justify-content-around" >
        <h3>e</h3>
        <h3>{GameName}</h3>

        <div>מהלכים: {moves}</div>
        <div></div>
        <div>זמן: {secondsLeft}</div>
        {/* <div></div> */}
        {/* <div>הצלחות: {correctMoves}</div> */}
      </div>
      <GameComponent SetHasEnded={setHasEnded} setMoves={setMoves} CardsJSON={CardsJSON} Time={secondsLeft} GameName={GameName} />

      <br />

      <div className="d-flex justify-content-center align-items-center">
        <Button variant="danger" size="lg" onClick={() => ExitGame()}>יציאה</Button>
      </div>
    </div>
  )
}