import React, { useEffect, useState } from 'react'
// import HTMLFlipBook from 'react-flip-page'
import HTMLFlipBook from 'react-pageflip'
import ChildEvaluationPrompt from '../ChildEvaluationPrompt';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';


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
          ? <div>אין מידע לשחק</div>
          :
          <>
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
            <label>{pageIndexDisplay}</label>
            <br />

            <Button onClick={() => TurnToNextPage()}>עמוד קודם</Button>
            <Button onClick={() => TurnToPrevPage()}>עמוד הבא</Button>
          </>
      }
    </div>
  )
})

const BookCover = React.forwardRef((props, ref) => {
  return (
    <div className="evaluation-book-cover evaluation-book-cover-front" ref={ref} >כריכה</div>
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
