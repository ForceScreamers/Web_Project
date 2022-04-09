import React, { useEffect, useState } from 'react'
// import HTMLFlipBook from 'react-flip-page'
import HTMLFlipBook from 'react-pageflip'
import ChildEvaluationPrompt from '../ChildEvaluationPrompt';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';




export const EvaluationsBook = React.forwardRef((props, ref) => {
  console.log(props.Evaluations)
  const flip = useRef(null);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  function TurnToNextPage() {
    // console.log(flip.current.pageFlip().flipNext())
    flip.current.pageFlip().flipNext();
  }

  function TurnToPrevPage() {
    console.log(flip.current.pageFlip())
    flip.current.pageFlip().flipPrev();
  }

  //  Need to flip to the start of the book to accommodate rtl 
  function FlipBookToRightSide() {
    flip.current.pageFlip().turnToPage(flip.current.pageFlip().getPageCount() - 1)
  }

  useEffect(() => {
    if (flip?.current?.pageFlip() !== undefined) {
      let pageCount = flip.current.pageFlip().getPageCount()
      setTotalPages(pageCount)
      flip.current.pageFlip().turnToPage(pageCount)
      setCurrentPageIndex(flip.current.pageFlip().getCurrentPageIndex())

    }
  }, [flip])




  return (
    <div>
      {
        props.Evaluations.length === 0
          ? <div>אין מידע לשחק</div>
          :
          <>

            <HTMLFlipBook onInit={() => FlipBookToRightSide()} showCover={false} flippingTime={600} maxShadowOpacity={0.2} style={{ backgroundColor: "transparent" }} ref={flip} width={500} height={600} useMouseEvents={false}>

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

            <label>{totalPages}</label>
            <br />
            <label>{currentPageIndex}</label>
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
    <div className="evaluation-book-page" ref={ref} >
      {
        <ChildEvaluationPrompt Evaluation={props.Evaluation} />
      }

    </div>
  );
});
