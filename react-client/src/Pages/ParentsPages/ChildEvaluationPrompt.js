// import ChildProgressBar from '../../Components/ParentsComponents/EditProfileComponents/ChildProgressBar.js'
export default function ChildEvaluationPrompt({ Evaluation }) {

  //  Evaluations consists of Topic and score
  return (
    <div>
      {
        // // If child has evaluations
        // 

        // Map each one to its corresponding name
      }
      <div className="d-flex flex-column">
        <h1>{Evaluation.GameName}</h1>

        <label>רמת קושי: {Evaluation.Difficulty}</label>
        <label>ממוצע מהלכים: {Evaluation.AverageMoveCount}</label>
        <label>ניקוד ממוצע: {Evaluation.AverageScore}</label>
        <label>זמן ממוצע: {Evaluation.AverageTimeInSeconds}</label>
        <label>שיא מהלכים:{Evaluation.LowestMoveCount}</label>
        <label>שיא זמן:{Evaluation.LowestTime}</label>
        <br />
      </div>

      {
        // : // Else
        // <label>אין נתונים</label>
      }


    </div>
  );
}

