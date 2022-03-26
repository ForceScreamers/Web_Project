import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import ShowScoreModal from "./ShowScoreModal";
import { ParentsApiRequest } from "../RequestHeadersToWebApi";
const SECONDS_TO_COMPLETE = 60;

export default function GameTemplate({ GameId, GameComponent, CardsJSON, GameName }) {

  const [secondsLeft, setSecondsLeft] = useState(SECONDS_TO_COMPLETE);

  const [hasEnded, setHasEnded] = useState(false);

  const history = useHistory();

  const [showScoreModal, setShowScoreModal] = useState(false);
  const [score, setScore] = useState(0);

  const [moves, setMoves] = useState(0);
  const [correctMoves, setCorrectMoves] = useState(0);

  useEffect(() => {
    if (!secondsLeft) return;

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);

  }, [secondsLeft]);

  function ResetTimer() {
    setSecondsLeft(SECONDS_TO_COMPLETE);
  }

  useEffect(() => {
    if (hasEnded === true) {
      OpenScoreModal();
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



  async function EndGame(score, gameId) {

    history.push('/Parent/Games')

    let evaluationScoreData = {
      childId: JSON.parse(sessionStorage.getItem('currentChild')).Id,
      gameId: gameId,
      gameScore: score,
    }

    ParentsApiRequest('POST', 'UpdateEvaluationScore', evaluationScoreData)
      .catch(err => console.log(err))
      .then(() => {
        setScore(score);
      })
  }

  function ExitGameAndUpdateScore() {
    history.push('/Parent/Games')
    EndGame(CalculateGameScore(), GameId)
  }

  function ExitGame() {
    history.push('/Parent/Games')
  }

  function CloseScoreModal() {
    setShowScoreModal(false);
    ExitGameAndUpdateScore();
    //UpdateChildrenProfiles();
  }

  function OpenScoreModal() {
    setShowScoreModal(true);
  }


  return (
    <div>
      <Button onClick={() => ResetTimer()}>ריסטרט</Button>
      <h3>{GameName}</h3>
      <div className="score d-flex flex-row justify-content-around" >
        <div>מהלכים: {moves}</div>
        <div>זמן: {secondsLeft}</div>
        <div>הצלחות: {correctMoves}</div>
      </div>

      <GameComponent SetMoves={setMoves} SetCorrectMoves={setCorrectMoves} SetHasEnded={setHasEnded} CardsJSON={CardsJSON} />
      <br />

      <div className="d-flex justify-content-center align-items-center">
        <Button variant="danger" size="lg" onClick={() => ExitGame()}>יציאה</Button>
      </div>

      <ShowScoreModal ShowScoreModal={showScoreModal} CloseScoreModal={CloseScoreModal} Score={score} />
    </div>
  )
}