// import ChildProgressBar from '../../Components/ParentsComponents/EditProfileComponents/ChildProgressBar.js'

export default function ChildEvaluationDisplay({ Evaluation }) {

  //  Evaluations consists of Topic and score
  console.log(Evaluation)
  return (
    <div>
      {
        // // If child has evaluations
        // Evaluations.length > 0 ?

        // Map each one to its corresponding name
      }
      <div className="d-flex flex-column">
        <label>{Evaluation.GameName}</label>
        <label>{Evaluation.Difficulty}</label>
        <label>{Evaluation.AverageMoveCount}</label>
        <label>{Evaluation.AverageScore}</label>
        <label>{Evaluation.AverageTimeInSeconds}</label>
        <label>{Evaluation.LowestMoveCount}</label>
        <label>{Evaluation.LowestTime}</label>

        <br />
      </div>

      {
        // : // Else
        // <label>אין נתונים</label>
      }


    </div>
  );
}

