import React from 'react'
import { useState } from 'react'

import { useEffect, useRef } from 'react'
// import img1 from './images/squid_1.png'
// import img2 from './images/squid_2.png'
import selectionImg from './images/selection.png'

import spotTheDifferenceSets from './SpotTheDifferenceSetsList.json'
import Randoms from '../../Randoms'

console.log(spotTheDifferenceSets);

//  The area padding the user is able to click around the correct coordinates for the game to be registered as correct
const CORRECT_POSITION_PADDING = 30;

//  The offset of the selection image
const CORRECT_SELECTION_OFFSET = {
  xOffset: -120,
  yOffset: -60,
}


//  turn to data array 
let setsData = [];
for (let imageSet in spotTheDifferenceSets) {
  setsData.push(spotTheDifferenceSets[imageSet]);
}

//  Generate random index
let randomIndex = Randoms.GetRandomInt(0, setsData.length - 1);
let imageSets = [];
let correctPositions = [];



function ExtractAndSetSetsData() {
  console.log('e')

  for (let dataSet in setsData) {

    //  Extracting the correct positions
    correctPositions.push(setsData[dataSet].correctPositions);

    //  Extracting the image sets
    imageSets.push(
      {
        img1: setsData[dataSet].img1,
        img2: setsData[dataSet].img2,
      }
    )
  }
}

function GetRandomImageSet() {
  return [
    setsData[randomIndex].img1,
    setsData[randomIndex].img2,
  ]
}

function GetRandomCorrectPositions() {
  return setsData[randomIndex].correctPositions;
}


export default function SpotTheDifference(Moves, SetMoves, EndGame) {
  useEffect(() => {
    ExtractAndSetSetsData()

  }, [])

  const [images, setImages] = useState(GetRandomImageSet());
  const [correctPositions, setCorrectPositions] = useState(GetRandomCorrectPositions());


  //TODO: Change to template moves
  const [correctMoves, setCorrectMoves] = useState(0);
  const [moves, setMoves] = useState(0);

  const [canvasContexts, setCanvasContexts] = useState([]);


  function IsClickContainedInPosition(mouseLocation, correctPosition) {
    return mouseLocation.x >= correctPosition.x - CORRECT_POSITION_PADDING
      &&
      mouseLocation.x <= correctPosition.x + CORRECT_POSITION_PADDING
      &&
      mouseLocation.y >= correctPosition.y - CORRECT_POSITION_PADDING
      &&
      mouseLocation.y <= correctPosition.y + CORRECT_POSITION_PADDING
      &&
      correctPosition.isActive === false

  }

  function CheckIsLocationCorrectAndActivate(mouseLocation, correctPosition) {
    if (IsClickContainedInPosition(mouseLocation, correctPosition)) {
      correctPosition.isActive = true;

      //  Increment correct moves by 1
      setCorrectMoves((correctMoves) => correctMoves + 1)
    }
  }

  function DrawActivePositions(context) {
    for (let position of correctPositions) {
      if (position.isActive) {

        let correctPositionImage = new Image();

        correctPositionImage.src = selectionImg;
        correctPositionImage.onload = function () {
          context.drawImage(correctPositionImage, position.x + CORRECT_SELECTION_OFFSET.xOffset, position.y + CORRECT_SELECTION_OFFSET.yOffset);
        }
      }
    }
  }

  function IsDone() {
    let isDone = true;
    for (let correctPosition of correctPositions) {
      if (correctPosition.isActive === false) {
        isDone = false;
      }
    }

    return isDone;
  }

  function HandleClick(e) {
    setMoves((moves) => moves + 1);

    let mousePosition = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }


    for (let position of correctPositions) {
      CheckIsLocationCorrectAndActivate(mousePosition, position);
    }

    UpdateCanvasContexts();

    if (IsDone()) {
      console.log("DONE!")
      //TODO: Add end game
    }
  }

  function UpdateCanvasContexts() {
    for (let canvasContext of canvasContexts) {
      DrawActivePositions(canvasContext);
    }
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center">

      <div>
        <div className="d-flex flex-row justify-content-around">
          <h2> מהלכים: {moves}</h2>
          <h2> מהלכים נכונים: {correctMoves}</h2>
          <h2> מהלכים שגויים: {moves - correctMoves}</h2>
        </div>


        {
          images.map((randomImage, index) => {
            return (
              <Canvas key={index} height={800} width={500} SetCanvasContext={setCanvasContexts} HandleClick={HandleClick} StartingImageSource={randomImage} />
            )
          })
        }
      </div>
    </div>
  )
}


function Canvas({ height, width, HandleClick, StartingImageSource, SetCanvasContext }) {
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current.getContext('2d');

    SetCanvasContext((prev) => [...prev, context]);

    SetStartingImageForContext(context);
  }, []);

  function SetStartingImageForContext(context) {

    let image = new Image();

    image.src = StartingImageSource;

    //  Draw image
    image.onload = () => {
      context.drawImage(image, 0, 0)
    }
  }


  return (
    <canvas style={{ border: 'solid black' }} ref={canvas} height={height} width={width} onClick={(e) => HandleClick(e)} />
  );
};