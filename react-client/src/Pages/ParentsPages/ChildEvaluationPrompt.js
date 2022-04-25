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
      <div className="d-flex flex-column">
        <h1>{Evaluation.GameName}: <label style={{ color: GetColorByDifficulty(Evaluation.Difficulty) }}>{DifficultyToHebrew(Evaluation.Difficulty)}</label></h1>

        <label>ממוצע מהלכים: {Evaluation.AverageMoveCount}</label>
        <label>ניקוד ממוצע: {Evaluation.AverageScore}</label>
        <label>זמן ממוצע: {ConvertSecondsToTime(Evaluation.AverageTimeInSeconds)}</label>
        <label>שיא מהלכים: {Evaluation.LowestMoveCount}</label>
        <label>שיא זמן: {ConvertSecondsToTime(Evaluation.LowestTime)}</label>
        <br />
      </div>
    </div>
  );
}

