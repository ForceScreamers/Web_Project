
export default function ChildEvaluationsDisplay({ Evaluations }) {

  console.log(Evaluations)
  function GameNameToHeb(gameName) {
    let hebGameName;

    switch (gameName) {
      case "Memory game":
        hebGameName = "משחק הזיכרון";
        break;
      case "Game 1":
        hebGameName = "משחק 1";
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
        Evaluations.map((evaluation, index) => {
          return (
            <div key={index}>
              {GameNameToHeb(evaluation.GameName)} : {evaluation.Score}
            </div>
          )
        })
      }

    </div>
  );
}

