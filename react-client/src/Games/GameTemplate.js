import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import ShowScoreModal from "./ShowScoreModal";
import ShowExitGameModal from "./ShowExitGameModal";
import { ParentsApiRequest } from "../RequestHeadersToWebApi";

const MAXIMUN_SECONDS = 3600;

const STARTING_SCORE = 100;
const WRONG_MOVE_PENALTY = -10;
const CORRECT_MOVE_REWARD = 20;



//TODO: Fix - timer has a delya of 1 second when stopping
export default function GameTemplate({ GameId, GameComponent, CardsJSON, GameName, Difficulty }) {

  const history = useHistory();

  const [secondsPassed, setSecondsPassed] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);

  const [hasEnded, setHasEnded] = useState(false);
  const [hasUserEndedGame, setHasUserEndedGame] = useState(false);

  //  Modals
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showExitGameModal, setShowExitGameModal] = useState(false);

  // Evaluation Parameters
  const [moves, setMoves] = useState(0);
  const [correctMoves, setCorrectMoves] = useState(0);

  const [childEvaluation, setChildEvaluation] = useState(0);


  useEffect(() => {
    let intervalId;

    if (stopTimer === false) {
      intervalId = setInterval(() => {
        setSecondsPassed((prevSecondsPassed) => prevSecondsPassed + 1);
      }, 1000);
    }

    if (secondsPassed >= MAXIMUN_SECONDS) {
      EndGameWithoutScoreUpdate();
      return () => clearInterval(intervalId);
    }


    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);

  }, [secondsPassed]);


  function ResetTimer() {
    setSecondsPassed(0);
  }

  useEffect(() => {
    if (hasEnded === true) {
      EndGameWithScoreUpdate();
      setStopTimer(true);
    }
  }, [hasEnded])



  function CalculateGameScore() {
    let wrongMoves = moves - correctMoves;
    let score = STARTING_SCORE;
    console.log(secondsPassed)

    score = STARTING_SCORE + (wrongMoves * WRONG_MOVE_PENALTY + correctMoves * CORRECT_MOVE_REWARD);

    if (score < 0) {
      score = 0;
    }

    return score;
  }



  async function RequestUpdateGameEvaluation(gameId) {
    let evaluationScoreData = {
      childId: JSON.parse(sessionStorage.getItem('currentChild')).Id,
      gameId: gameId,
      gameScore: childEvaluation,
      time: secondsPassed,
      moves: moves,
      difficulty: Difficulty,
    }

    ParentsApiRequest('POST', 'UpdateEvaluationScore', evaluationScoreData)
      .catch(err => console.log(err))
  }


  function EndGameWithoutScoreUpdate() {
    setHasUserEndedGame(true);
    OpenExitGameModal();
  }


  function EndGameWithScoreUpdate() {
    setChildEvaluation(CalculateGameScore()); //Update score
    OpenScoreModal();
  }


  function OnCloseScoreModal() {
    setShowScoreModal(false);
    RequestUpdateGameEvaluation(GameId);
    //UpdateChildrenProfiles();
    //history.push('/Parent/Games');
  }


  function OnCloseExitGameModal() {
    CloseExitGameModal();
    history.push('/Parent/Games');
  }


  function OpenScoreModal() { setShowScoreModal(true); }

  function CloseExitGameModal() { setShowExitGameModal(false); }
  function OpenExitGameModal() { setShowExitGameModal(true); }

  return (
    <div>
      <Button onClick={() => ResetTimer()}>ריסטרט</Button>
      <h3>{GameName}</h3>
      <div className="score d-flex flex-row justify-content-around" >
        <div>מהלכים: {moves}</div>
        <div>זמן: {secondsPassed}</div>
        <div>הצלחות: {correctMoves}</div>
      </div>

      <GameComponent
        SetMoves={setMoves}
        SetCorrectMoves={setCorrectMoves}
        SetHasEnded={setHasEnded}
        HasUserEndedGame={hasUserEndedGame}
        CardsJSON={CardsJSON}
        Difficulty={Difficulty}
      />
      <br />

      <div className="d-flex justify-content-center align-items-center">
        <Button variant="danger" size="lg" onClick={() => EndGameWithoutScoreUpdate()}>יציאה</Button>
      </div>

      <ShowScoreModal ShowScoreModal={showScoreModal} CloseScoreModal={OnCloseScoreModal} Score={childEvaluation} Time={secondsPassed} />
      <ShowExitGameModal ShowExitGameModal={showExitGameModal} CloseExitGameModal={OnCloseExitGameModal} />
    </div>
  )
}