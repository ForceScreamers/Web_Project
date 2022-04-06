import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import { useState, useEffect } from "react";
import ChildEvaluationDisplay from "./ChildEvaluationDisplay"
import ChildEvaluationsDisplay from "./ChildEvaluationsDisplay";
import { Button } from "react-bootstrap";
import PageFlipTest from "./PageFlip/PageFlipTest";
import NoChildrenMessage from "../../Components/ParentsComponents/GamesPageComponents/NoChildrenMessage";



export default function JournalPage({ LoadChildrenFromServer, ChildProfile }) {

  const [childrenProfiles, setChildrenProfiles] = useState(JSON.parse(sessionStorage.getItem('children')))
  const [selectedChild, setSelectedChild] = useState(GetSelectedChild());
  const [currentEvaluationIndex, setCurrentEvaluationIndex] = useState(0)

  useEffect(() => {
    //TODO: Check if needed (already setting it in state creation)
    setChildrenProfiles(JSON.parse(sessionStorage.getItem('children')));
  }, [])

  function GetSelectedChild() {
    for (let childProfile of childrenProfiles) {
      if (childProfile.IsSelected === true) {
        return childProfile;
      }
    }
  }


  function SetNextEvaluationIndex() {
    let evaluationsCount = selectedChild.Evaluations.length;

    if (evaluationsCount === currentEvaluationIndex + 1) {//  Edge case
      setCurrentEvaluationIndex(0);
    }
    else {
      setCurrentEvaluationIndex((prev) => prev + 1)
    }
  }

  function SetPreviousEvaluationIndex() {
    let evaluationsCount = selectedChild.Evaluations.length;

    if (currentEvaluationIndex === 0) {//  Edge case
      setCurrentEvaluationIndex(evaluationsCount - 1);
    }
    else {
      setCurrentEvaluationIndex((prev) => prev - 1)
    }
  }

  //! Pay attention to each difficulty for each game!
  return (
    <div>
      <ParentMainPage title={selectedChild === undefined ? `` : `היומן של ${selectedChild.Name}`}>
        <div>
          {
            //  If there is no child selected
            selectedChild === undefined
              ? <NoChildrenMessage />
              :
              <div>
                {
                  //  If the selected child has no evaluations
                  selectedChild.Evaluations.length > 0
                    ? <ChildEvaluationDisplay Evaluation={selectedChild.Evaluations[currentEvaluationIndex]} />
                    : <label>אין מידע לשחק</label>
                }
                <Button onClick={() => SetNextEvaluationIndex()}>Next</Button>
                <Button onClick={() => SetPreviousEvaluationIndex()}>Previous</Button>
              </div>
          }
        </div>



        <PageFlipTest />
      </ParentMainPage>
    </div>
  )
}