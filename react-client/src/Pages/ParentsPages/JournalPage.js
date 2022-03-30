import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import { useState, useEffect } from "react";
import ChildEvaluationDisplay from "./ChildEvaluationDisplay"
import ChildEvaluationsDisplay from "./ChildEvaluationsDisplay";
import { Button } from "react-bootstrap";



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

  //TODO: Handle no children
  //TODO: Handle no data for child
  //! Pay attention to each difficulty for each game!
  return (
    <div>
      <ParentMainPage title='היומן שלי'>
        <div>
          {
            // childrenProfiles !== null//  If there are no children

            //  i - index inside the state array, using it because react wants to use it...
            // ? childrenProfiles.map((childProfile, index) => (
            <div>
              {/* <label >{index}</label> */}
              <h1>{selectedChild.Name}</h1>
              <ChildEvaluationsDisplay />
              <ChildEvaluationDisplay Evaluation={selectedChild.Evaluations[currentEvaluationIndex]} />
            </div>
            // ))
            // : <></>
          }

          <Button onClick={() => SetNextEvaluationIndex()}>Next</Button>
          <Button onClick={() => SetPreviousEvaluationIndex()}>Previous</Button>

        </div>
      </ParentMainPage>
    </div>
  )
}