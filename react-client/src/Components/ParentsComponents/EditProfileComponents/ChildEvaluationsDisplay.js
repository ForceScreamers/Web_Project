export default function ChildEvaluationsDisplay({ Evaluations }) {

  //  Evaluations consists of Topic and score

  console.log(Evaluations)
  function GameNameToHeb(gameName) {
    let hebGameName;

    switch (gameName) {
      case "Memory game":
        hebGameName = "משחק הזיכרון";
        break;
      case "Match cards game":
        hebGameName = "התאמת קלפים";
        break;
      case "Game 2":
        hebGameName = "משחק 2";
        break;




      default:
        hebGameName = "אין משחק לתרגם";
        break;
    }

    return hebGameName
  }

  return (
    <div>
      {
        // If child has evaluations
        Evaluations.length > 0 ?

          // Map each one to its corresponding name
          Evaluations.map((evaluation, index) => {
            return (
              <div key={index}>
                {GameNameToHeb(evaluation.GameName)} : {evaluation.Score}
              </div>

            )
          })

          : // Else
          <label>אין נתונים</label>
      }

    </div>
  );
}

