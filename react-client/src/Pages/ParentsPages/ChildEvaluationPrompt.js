import { GAME_DIFFICULTY } from "../../Constants";

import ConvertSecondsToTime from "../../TimeConvert";

export default function ChildEvaluationPrompt({ Evaluation }) {
  function DifficultyToHebrew(difficulty) {
    let parsedDifficulty = parseInt(difficulty)

    if (parsedDifficulty === GAME_DIFFICULTY.EASY) {
      return "קל";
    }
    else if (parsedDifficulty === GAME_DIFFICULTY.MEDIUM) {
      return "בינוני";
    }
    else if (parsedDifficulty === GAME_DIFFICULTY.HARD) {
      return "קשה";
    }
    else {
      console.error("ERROR TRANSLATING DIFFICULTY LEVEL TO HEBREW");
      return "";
    }
  }

  function GetColorByDifficulty(difficulty) {
    let parsedDifficulty = parseInt(difficulty)

    const GREEN = "#198754";
    const YELLOW = "#ffc107";
    const RED = "#dc3545";

    if (parsedDifficulty === GAME_DIFFICULTY.EASY) {
      return GREEN;
    }
    else if (parsedDifficulty === GAME_DIFFICULTY.MEDIUM) {
      return YELLOW;
    }
    else if (parsedDifficulty === GAME_DIFFICULTY.HARD) {
      return RED;
    }
    else {
      console.error("ERROR COLORING DIFFICULTY LABEL");
      return "";
    }
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <h1>{Evaluation.GameName} </h1>
      </div>

      <div className="d-flex flex-column" style={{ fontSize: "18px" }}>
        <label style={{ fontSize: "22px", fontWeight: "500" }}>רמת קושי: <label style={{ color: GetColorByDifficulty(Evaluation.Difficulty), fontSize: "26px" }}>{DifficultyToHebrew(Evaluation.Difficulty)}</label></label>

        <br />

        <label style={{ fontSize: "22px", fontWeight: "500" }}>הממוצע שלי:</label>

        <br />

        <div className="d-flex flex-row justify-content-around">

          <div className="d-flex flex-column align-items-center">
            <label>ממוצע מהלכים</label>
            <label>{Evaluation.AverageMoveCount}</label>
          </div>

          <div className="d-flex flex-column align-items-center">
            <label>ניקוד ממוצע</label>
            <label>{Evaluation.AverageScore}</label>
          </div>

          <div className="d-flex flex-column align-items-center">
            <label>זמן ממוצע</label>
            <label>{ConvertSecondsToTime(Evaluation.AverageTimeInSeconds)}</label>
          </div>

        </div>

        <br />

        <label style={{ fontSize: "22px", fontWeight: "500" }}>השיאים שלי:</label>

        <br />

        <div className="d-flex flex-row justify-content-around">
          <div className="d-flex flex-column align-items-center">
            <label>שיא מהלכים</label>
            <label>{Evaluation.LowestMoveCount}</label>
          </div>
          <div className="d-flex flex-column align-items-center">
            <label>שיא זמן</label>
            <label>{ConvertSecondsToTime(Evaluation.LowestTime)}</label>
          </div>

        </div>

        <br />
      </div>
    </div>
  );
}

