import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import { useState, useEffect, useRef } from "react";
import ChildEvaluationPrompt from "./ChildEvaluationPrompt"
import { Button } from "react-bootstrap";
import PageFlipTest from "./PageFlip/PageFlipTest";
import NoChildrenMessage from "../../Components/ParentsComponents/GamesPageComponents/NoChildrenMessage";
import React from "react";
import HTMLFlipBook from 'react-pageflip';
import { forwardRef } from "react";

import './JournalComponents/Book.css'
import { EvaluationsBook } from "./JournalComponents/EvaluationsBook";
export default function JournalPage({ LoadChildrenFromServer, ChildProfile }) {

  const [childrenProfiles, setChildrenProfiles] = useState(JSON.parse(sessionStorage.getItem('children')))
  const [selectedChild, setSelectedChild] = useState(GetSelectedChild());


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




  //! Pay attention to each difficulty for each game!
  return (
    <div>

      <ParentMainPage title={selectedChild === undefined ? `` : `היומן של ${selectedChild.Name}`}>
        <div>
          {
            //  If there is no child selected
            // selectedChild === undefined
            //   ? <NoChildrenMessage />
            //   :
            //   <div>
            //     {
            //       //  If the selected child has no evaluations
            //       selectedChild.Evaluations.length > 0
            //         ? <ChildEvaluationPrompt Evaluation={selectedChild.Evaluations[currentEvaluationIndex]} />
            //         : <label>אין מידע לשחק</label>
            //     }
            //     {/* The buttons call the opposing functions to match rtl reading */}

            //   </div>
          }
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center" >
          <div style={{ width: "1050px", height: "420px" }}>

            <EvaluationsBook
              Evaluations={selectedChild.Evaluations}
            />


            {/* <PageFlipTest /> */}
          </div >

        </div>

      </ParentMainPage>

    </div>
  )
}




