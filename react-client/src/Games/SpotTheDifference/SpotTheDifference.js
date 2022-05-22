import React from 'react'
import { useState } from 'react'

import { useEffect } from 'react'
import selectionImg from '../../website-images/spot-the-difference-selection.png'
import Canvas from './Canvas'

import './SpotTheDifferenceStyles.css'

import GetCardsDataFromJsonByDifficulty from '../CardDataManipulations/ExtractFromJsonClass'


//  The area padding the user is able to click around the correct coordinates for the game to be registered as correct
const CORRECT_POSITION_PADDING = 30;

//  The offset of the selection image
const CORRECT_SELECTION_OFFSET = {
  xOffset: -65,
  yOffset: -40,
}

const CORRECT_SELECTION_WIDTH = 100;
const CORRECT_SELECTION_HEIGHT = 75;


function GetImagesFromDataSet(dataSet) {
  console.log(dataSet)
  return [
    dataSet.img1,
    dataSet.img2,
  ]
}

function GetCorrectPositionsFromDataSet(dataSet) {
  return [...dataSet.correctPositions];
}

export default function SpotTheDifference({ SetMoves, SetCorrectMoves, SetHasEnded, CardsJSON, HasUserEndedGame, Difficulty }) {

  const [randomDataSet, setRandomDataSet] = useState(() =>
    GetCardsDataFromJsonByDifficulty(CardsJSON, Difficulty)
  );

  const [images, setImages] = useState(() => GetImagesFromDataSet(randomDataSet));

  const [correctPositions, setCorrectPositions] = useState(() => GetCorrectPositionsFromDataSet(randomDataSet));

  const [canvasContexts, setCanvasContexts] = useState([]);


  function IsPositionCorrect(mouseLocation, correctPosition) {

    //  Checks if the click is contained inside the correct position
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

  function DrawActivePositions(context) {
    for (let position of correctPositions) {
      if (position.isActive) {

        let correctPositionImage = new Image();

        correctPositionImage.src = selectionImg;
        correctPositionImage.onload = function () {
          context.drawImage(correctPositionImage, position.x + CORRECT_SELECTION_OFFSET.xOffset, position.y + CORRECT_SELECTION_OFFSET.yOffset, CORRECT_SELECTION_WIDTH, CORRECT_SELECTION_HEIGHT);
        }
      }
    }
  }

  function SetCorrectPositionsToFalse() {
    console.log("Setting...")
    let newCorrectPositions = [...correctPositions];

    for (let newCorrectPosition of newCorrectPositions) {
      newCorrectPosition.isActive = false;
    }

    setCorrectPositions(newCorrectPositions);
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
    SetMoves((moves) => moves + 1);

    let mousePosition = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
    console.log(mousePosition)

    let newCorrectPositions = [...correctPositions];

    for (let newPosition of newCorrectPositions) {
      if (IsPositionCorrect(mousePosition, newPosition)) {

        //  Activate position
        newPosition.isActive = true;

        //  Increment correct moves
        SetCorrectMoves((prevCorrectMoves) => prevCorrectMoves + 1)
      }
    }
    setCorrectPositions(newCorrectPositions);

    UpdateCanvasContexts();

    if (IsDone()) {
      SetCorrectPositionsToFalse();
      SetHasEnded(true);
    }
  }

  useEffect(() => {

    if (HasUserEndedGame === true) {
      SetCorrectPositionsToFalse();
    }
  }, [HasUserEndedGame])

  function UpdateCanvasContexts() {
    for (let canvasContext of canvasContexts) {
      DrawActivePositions(canvasContext);
    }
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center">

      <div>
        {
          images.map((randomImage, index) => {

            return (
              <Canvas key={index} height={800} width={512} SetCanvasContext={setCanvasContexts} HandleClick={HandleClick} StartingImageSource={randomImage} />
            )
          })
        }
      </div>
    </div>
  )
}


