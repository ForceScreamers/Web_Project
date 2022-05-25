import React, { useEffect, useState } from 'react'
// import HTMLFlipBook from 'react-flip-page'
import HTMLFlipBook from 'react-pageflip'
import ChildEvaluationPrompt from '../ChildEvaluationPrompt';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';

import NoEvaluationsMessage from './NoEvaluationsMessage';

import flipBookArrowRight from '../../../website-images/flip-book-button-right.png'
import flipBookArrowLeft from '../../../website-images/flip-book-button-left.png'



export const EvaluationsBook = React.forwardRef((props, ref) => {
  console.log(props.Evaluations)
  const flip = useRef(null);

  const [pageIndexDisplay, setPageIndexDisplay] = useState("עמוד 1");

  function TurnToNextPage() {
    flip.current.pageFlip().flipNext();
  }

  function TurnToPrevPage() {
    flip.current.pageFlip().flipPrev();
  }

  //  Flip to the start of the book to accommodate rtl 
  function FlipBookToRightSide() {
    flip?.current?.pageFlip()?.turnToPage(flip.current.pageFlip().getPageCount() - 1)
  }

  function UpdatePageIndexDisplay() {

    let totalPages = flip?.current?.pageFlip()?.getPageCount();
    let currentIndex = flip?.current?.pageFlip()?.getCurrentPageIndex();
    let pageIndexDisplayFormat = "עמוד 1";

    if (currentIndex !== totalPages) {
      pageIndexDisplayFormat = `עמודים ${totalPages - currentIndex - 1} - ${totalPages - currentIndex} מתוך ${totalPages}`
    }

    setPageIndexDisplay(pageIndexDisplayFormat);
  }


  return (
    <div>
      {
        props.Evaluations.length === 0
          ? <NoEvaluationsMessage />
          :
          <div>
            <div className="d-flex " style={{ width: "120%" }}>
              <Button className="evaluation-book-button" onClick={() => TurnToNextPage()}><img alt="flip-left" src={flipBookArrowRight} width="100px" /></Button>

              <HTMLFlipBook onFlip={UpdatePageIndexDisplay} onInit={() => FlipBookToRightSide()} showCover={true} flippingTime={600} maxShadowOpacity={0.2} style={{ backgroundColor: "transparent" }} ref={flip} width={500} height={500} useMouseEvents={false}>

                <BookCover />

                {
                  props.Evaluations.map((evaluation, index) => {
                    return (
                      <EvaluationPage
                        key={index}
                        Evaluation={evaluation}
                      />

                    )
                  })
                }

                <BookCover />

              </HTMLFlipBook>

              <Button className="evaluation-book-button" onClick={() => TurnToPrevPage()}><img alt="flip-left" src={flipBookArrowLeft} width="100px" /></Button>
            </div>
          </div>
      }
    </div>
  )
})

const BookCover = React.forwardRef((props, ref) => {
  const [currentChildName, setCurrentChildName] = useState(() => GetCurrentChildName())

  function GetCurrentChildName() {
    let currentChild = JSON.parse(sessionStorage.getItem('currentChild'));
    if (currentChild) {
      return currentChild.Name;
    }
    else {
      return ""
    }
  }

  return (
    <div className="evaluation-book-cover evaluation-book-cover-front" ref={ref} >היומן של {currentChildName}</div>
  );
});


const EvaluationPage = React.forwardRef((props, ref) => {

  return (
    <div className="evaluation-book-page" ref={ref} data-density="hard">
      {
        <ChildEvaluationPrompt Evaluation={props.Evaluation} />
      }

    </div>
  );
});