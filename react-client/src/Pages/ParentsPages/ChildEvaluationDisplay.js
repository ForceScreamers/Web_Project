// import ChildProgressBar from '../../Components/ParentsComponents/EditProfileComponents/ChildProgressBar.js'
export default function ChildEvaluationDisplay({ Evaluation }) {

  //  Evaluations consists of Topic and score
  console.log(Evaluation)
  return (
    <div>
      {
        // // If child has evaluations
        // 

        // Map each one to its corresponding name
      }
      <div className="d-flex flex-column">
        <label>משחק: {Evaluation.GameName}</label>
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

