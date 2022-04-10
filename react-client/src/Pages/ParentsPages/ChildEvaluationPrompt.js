// import ChildProgressBar from '../../Components/ParentsComponents/EditProfileComponents/ChildProgressBar.js'
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

  //  Evaluations consists of Topic and score
  return (
    <div>
      {
        // // If child has evaluations
        // 

        // Map each one to its corresponding name
      }
      <div className="d-flex flex-column">
        <h1>{Evaluation.GameName}: <label>{DifficultyToHebrew(Evaluation.Difficulty)}</label></h1>

        <label>ממוצע מהלכים: {Evaluation.AverageMoveCount}</label>
        <label>ניקוד ממוצע: {Evaluation.AverageScore}</label>
        <label>זמן ממוצע: {ConvertSecondsToTime(Evaluation.AverageTimeInSeconds)}</label>
        <label>שיא מהלכים: {Evaluation.LowestMoveCount}</label>
        <label>שיא זמן: {ConvertSecondsToTime(Evaluation.LowestTime)}</label>
        <br />
      </div>

      {
        // : // Else
        // <label>אין נתונים</label>
      }


    </div>
  );
}

