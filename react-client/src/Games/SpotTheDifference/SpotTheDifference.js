import React from 'react'
import { useState } from 'react'

import { useEffect } from 'react'
// import img1 from './images/squid_1.png'
// import img2 from './images/squid_2.png'
import selectionImg from './images/selection.png'
import Canvas from './Canvas'

// import spotTheDifferenceSets from './SpotTheDifferenceSetsList.json'
import Randoms from '../../Randoms'


//  The area padding the user is able to click around the correct coordinates for the game to be registered as correct
const CORRECT_POSITION_PADDING = 30;

//  The offset of the selection image
const CORRECT_SELECTION_OFFSET = {
  xOffset: -120,
  yOffset: -60,
}


function jsonDataToArray(jsonData) {
  //  Convert to array
  let imageSetData = [];

  for (let card in jsonData) {
    imageSetData.push(jsonData[card]);
  }
  return imageSetData;
}

function GetRandomDataSet(jsonData) {

  //  Convert to js array
  let dataSets = jsonDataToArray(jsonData);
  let randomIndex = Randoms.GetRandomInt(0, dataSets.length - 1);

  return dataSets[randomIndex];
}

function GetImagesFromDataSet(dataSet) {
  return [
    dataSet.img1,
    dataSet.img2,
  ]
}

function GetCorrectPositionsFromDataSet(dataSet) {
  return [...dataSet.correctPositions];
}


export default function SpotTheDifference({ SetMoves, SetCorrectMoves, SetHasEnded, CardsJSON }) {


  const randomDataSet = GetRandomDataSet(CardsJSON);
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
          context.drawImage(correctPositionImage, position.x + CORRECT_SELECTION_OFFSET.xOffset, position.y + CORRECT_SELECTION_OFFSET.yOffset);
        }
      }
    }
  }

  function SetCorrectPositionsToFalse() {
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
              <Canvas key={index} height={800} width={500} SetCanvasContext={setCanvasContexts} HandleClick={HandleClick} StartingImageSource={randomImage} />
            )
          })
        }
      </div>
    </div>
  )
}


