import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const SECONDS_TO_COMPLETE = 60;

export default function GameTemplate({ EndGame, GameId, GameComponent, ExitGame }) {

  const [secondsLeft, setSecondsLeft] = useState(SECONDS_TO_COMPLETE);

  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (!secondsLeft) return;

    const intervalId = setTimeout(() => {
      //console.log(secondsLeft)
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



  return (
    <div>
      <Button onClick={() => EndGame(CalculateGameScore(), GameId)}>debug exit</Button>
      <Button onClick={() => ExitGame()}>יציאה</Button>
      <Button onClick={() => ResetTimer()}>ריסטרט</Button>
      <GameComponent SetHasEnded={setHasEnded} />
    </div>
  )
}
