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
    setChildrenProfiles(JSON.parse(sessionStorage.getItem('children')));
  }, [])

  function GetSelectedChild() {
    for (let childProfile of childrenProfiles) {
      if (childProfile.IsSelected === true) {
        return childProfile;
      }
    }
  }



  return (
    <div>

      <ParentMainPage>
        <div className="d-flex flex-column justify-content-center align-items-center" >
          <div style={{ width: "1050px", height: "420px" }}>

            <EvaluationsBook
              Evaluations={selectedChild.Evaluations}
            />
          </div>

        </div>

      </ParentMainPage>

    </div>
  )
}




