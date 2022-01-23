import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const SECONDS_TO_COMPLETE = 60;

export default function GameTemplate({ children, HandleEvaluationUpdate, GameId }) {

  // initialize timeLeft with the seconds prop
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_TO_COMPLETE);

  useEffect(() => {
    if (!secondsLeft) return;

    const intervalId = setTimeout(() => {
      console.log(secondsLeft)
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearTimeout(intervalId);

  }, [secondsLeft]);

  function ResetTimer() {
    setSecondsLeft(SECONDS_TO_COMPLETE);
  }


  //  Calculate score
  function CalculateGameScore() {
    //finished in 10 seconds - 10 points
    // - "" -     9 seconds - 9 points
    let completionTime = SECONDS_TO_COMPLETE - secondsLeft;
    let score = completionTime;

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

    alert(score);
    return score;
  }



  return (
    <div>
      <Button onClick={() => HandleEvaluationUpdate(CalculateGameScore(), GameId)}>יציאה</Button>
      <Button onClick={() => ResetTimer()}>ריסטרט</Button>
      <Button onClick={() => CalculateGameScore()}>calc</Button>
      {children}
    </div>
  )
}
