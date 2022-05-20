import React, { useState } from 'react'
import { useEffect } from 'react'
import Canvas from '../SpotTheDifference/Canvas';
import { useRef } from "react";

import background from '../../website-images/catch-game-background.png';

import './CatchGameStyles.css'
import useWindowDimensions from '../../useWindowDimensions';
import { ReactDOM } from 'react';

import dropImage from '../../website-images/download.jpg'
import Randoms from '../../Randoms';


const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 1000;

const DROP_HEIGHT_INTERVAL = 2;

const DROP_STARTING_HEIGHT_OFFSET = -150;
const DROP_STARTING_RIGHT_LEFT_PADDING_OFFSET = 30;
const DROP_RESPAWN_BOTTOM_OFFSET = 40;

class Drop {
  constructor(x, y, width, height, elementName, imagePath, imageType, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    //  Spawn timer default value
    this.spawnTimer = 0;

    this.dropInterval = DROP_HEIGHT_INTERVAL;
    this.isClicked = false;
    this.elementName = elementName;

    this.imagePath = imagePath;
    this.imageType = imageType;
    this.color = color;
  }

  ReduceSpawnTimer() { this.spawnTimer--; }
  ResetSpawnTimer() { this.spawnTimer = 100 }

  ReduceHeight() { this.y += this.dropInterval; }

  IsWaiting() { return this.spawnTimer > 0 }
  Wait() { this.dropInterval = 0; }
  Resume() { this.dropInterval = DROP_HEIGHT_INTERVAL; }

  ResetDropPositionToStartOfCanvas(canvasElement) {
    //  Generate a random x inside the canvas with padding
    let randomStartingXMaximum = canvasElement.offsetLeft + CANVAS_WIDTH - this.width - DROP_STARTING_RIGHT_LEFT_PADDING_OFFSET;
    let randomStartingXMinimum = canvasElement.offsetLeft + DROP_STARTING_RIGHT_LEFT_PADDING_OFFSET;

    let dropStartingX = Randoms.GetRandomInt(randomStartingXMinimum, randomStartingXMaximum);

    //  The y position if the drop is above the canvas
    let dropStartingY = canvasElement.offsetTop + this.height + DROP_STARTING_HEIGHT_OFFSET;

    //  Set to object
    this.x = dropStartingX;
    this.y = dropStartingY;
  }

  ResetAndWait(canvasElement) {
    this.ResetSpawnTimer();
    this.ResetDropPositionToStartOfCanvas(canvasElement)
    this.Wait();
  }
}


//  From json





//TODO: 
//each image should fall at a different time

//add json and 3 difficulties
//  Total number of drops
//  Speed
//  Time to spawn

//add random wait time

//add pause button

//  once an image has been clicked or restarted, it should generate a new image


function GetImageSizeByImageType(imageType, jsonData) {
  let imageSizes = jsonData.imageSizes;
  let imageSize = { width: 100, height: 100 };



  if (imageType === "pencil") {
    console.log("E")
    imageSize = imageSizes.pencil;
  }
  else if (imageType === "pin") {
    imageSize = imageSizes.pin;
  }
  else if (imageType === "book") {
    imageSize = imageSizes.book;
  }
  else if (imageType === "glass") {
    imageSize = imageSizes.glass;
  }


  console.log("EEEEEEEEEEEEEEEEEEEEE")
  console.log(imageSize)


  return imageSize;
}

function GenerateRandomDropToCatch() {
  const COLORS = ["green", "red", "black", "pink", "yellow"];
  const IMAGE_TYPES = ["pencil", "book", "glass", "pin"];

  let randomColor = COLORS[Randoms.GetRandomInt(0, COLORS.length - 1)];
  let randomImageType = IMAGE_TYPES[Randoms.GetRandomInt(0, IMAGE_TYPES.length - 1)];

  return { color: randomColor, imageType: randomImageType };
}

function TranslateScentenceFromDropToCatch(dropToCatch) {
  let imageTypeTranslated = TranslateImageTypeToCatch(dropToCatch);
  let colorTranslated = TranslateColorToCatch(dropToCatch);

  console.log(dropToCatch)

  let translatedScentence = `${imageTypeTranslated} ${colorTranslated}`;

  return translatedScentence;
}

function TranslateColorToCatch(dropToCatch) {
  let colorToCatch = "";
  if (dropToCatch.imageType === "glass") {
    if (dropToCatch.color === "red") {
      colorToCatch = "אדומות";
    }
    else if (dropToCatch.color === "green") {
      colorToCatch = "ירוקות";
    }
    else if (dropToCatch.color === "yellow") {
      colorToCatch = "צהובות";
    }
    else if (dropToCatch.color === "black") {
      colorToCatch = "שחורות";
    }
    else if (dropToCatch.color === "pink") {
      colorToCatch = "ורודות";
    }
  }
  else {
    if (dropToCatch.color === "red") {
      colorToCatch = "אדומים";
    }
    else if (dropToCatch.color === "green") {
      colorToCatch = "ירוקים";
    }
    else if (dropToCatch.color === "yellow") {
      colorToCatch = "צהובים";
    }
    else if (dropToCatch.color === "black") {
      colorToCatch = "שחורים";
    }
    else if (dropToCatch.color === "pink") {
      colorToCatch = "ורודים";
    }
  }

  return colorToCatch;
}

function TranslateImageTypeToCatch(dropToCatch) {
  let imageTypeToCatch = "";
  if (dropToCatch.imageType === "pencil") {
    imageTypeToCatch = "עפרונות";
  }
  else if (dropToCatch.imageType === "pin") {
    imageTypeToCatch = "נעצים";
  }
  else if (dropToCatch.imageType === "book") {
    imageTypeToCatch = "ספרים";
  }
  else if (dropToCatch.imageType === "glass") {
    imageTypeToCatch = "זכוכיות מגדלת";
  }

  return imageTypeToCatch;
}

let dropCounter = 0;

function GenerateRandomDrop(jsonData) {

  //  TODO: Select difficulty
  //  get dorp count from difficulty
  // let dropCount = jsonData



  //  Generate a random index to select an image from
  let randomIndex = Randoms.GetRandomInt(0, 19);

  //  Get data according to the index and json
  let randomDropJsonData = jsonData.cards[randomIndex];

  //  Each image size has it's own size
  let dropSize = GetImageSizeByImageType(randomDropJsonData.name, jsonData);

  let generatedDrop = new Drop(0, 0, dropSize.width, dropSize.height, `drop${dropCounter++}`, randomDropJsonData.imagePath, randomDropJsonData.name, randomDropJsonData.color);

  return generatedDrop;
}

function GenerateRandomDrops(jsonData) {
  let randomDrops = [];

  for (let i = 0; i < 10; i++) {
    randomDrops.push(GenerateRandomDrop(jsonData));
  }

  return randomDrops;
}


export default function CatchGame({ SetMoves, SetCorrectMoves, SetHasEnded, HasUserEndedGame /*?*/, CardsJSON, Difficulty }) {
  const [secondsPassed, setSecondsPassed] = useState(0);

  const [drops, setDrops] = useState(() => GenerateRandomDrops(CardsJSON));
  const [dropToCatch, setDropToCatch] = useState(null);

  const [canvasElement, setCanvasElement] = useState(null);

  const [scentenceDisplay, setSentenceToDisplay] = useState("");

  useEffect(() => {
    setCanvasElement(document.getElementById('canvas'))

    let dropToCatch = GenerateRandomDropToCatch();
    setDropToCatch(dropToCatch);

    let translatedScentence = TranslateScentenceFromDropToCatch(dropToCatch);
    console.log(translatedScentence)
    setSentenceToDisplay(translatedScentence)
  }, [])

  function ResetDropPositions() {
    let tempDrops = [...drops];
    for (let drop of tempDrops) {
      drop.ResetDropPositionToStartOfCanvas(canvasElement)
    }
  }

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      setSecondsPassed((prevSecondsPassed) => prevSecondsPassed + 1);
      if (canvasElement) {
        Update();
      }
    }, 10);

    return () => clearInterval(intervalId);

  }, [secondsPassed]);


  //TODO: Rework
  function Update() {

    let tempDrops = [...drops];

    for (let drop of tempDrops) {

      if (drop.IsWaiting()) {
        drop.ReduceSpawnTimer();
      }
      else {// Drop isn't waiting
        drop.Resume();
        drop.ReduceHeight();

        if (HasDropReachedBottomOfCanvas(drop)) {
          drop.ResetAndWait(canvasElement);
        }

        if (drop.isClicked) {
          drop.ResetAndWait(canvasElement);
          drop.isClicked = false;

          if (IsDropCorrect(drop)) {
            //  Increment moves count
            SetCorrectMoves((prevCorrectMoves) => prevCorrectMoves + 1)
          }
        }
      }

      UpdateElementPropsByDrop(drop)
    }

    setDrops(tempDrops);
  }

  function IsDropCorrect(drop) {
    return drop.color === dropToCatch.color && drop.imageType === dropToCatch.imageType;
  }

  function HasDropReachedBottomOfCanvas(drop) {
    let canvasBottomY = canvasElement.offsetTop + CANVAS_HEIGHT - drop.height - DROP_RESPAWN_BOTTOM_OFFSET;
    return drop.y >= canvasBottomY
  }

  function UpdateElementPropsByDrop(drop) {
    let dropElement = document.getElementById(drop.elementName);
    dropElement.style.top = drop.y + "px";
    dropElement.style.left = drop.x + "px";

    dropElement.hidden = drop.IsWaiting();
  }



  function HandleImageClick(e) {
    //  Update the matching image element
    let tempDrops = [...drops];

    for (let drop of tempDrops) {
      if (drop.elementName === e.target.id) {
        drop.isClicked = true;
      }
    }

    setDrops(tempDrops)
  }

  return (
    <div className="d-flex justify-content-center">

      <div style={{ padding: "50px", backgroundColor: "white" }} className="d-flex justify-content-center align-items-start">
        <label>{scentenceDisplay}</label>
      </div>
      <div onLoad={() => ResetDropPositions()} onClick={() => SetMoves((prevMoves) => prevMoves + 1)} id="canvas" className="catch-game-main-container" style={{ backgroundColor: "blue", width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
        {
          drops.map((drop, index) => {
            return (
              <img
                src={drop.imagePath}
                key={index}
                style={{ position: "absolute", cursor: "pointer", userSelect: "none" }}
                onMouseDown={HandleImageClick}
                alt="drop"
                id={drop.elementName}
                width={drop.width}
                height={drop.height}
              ></img>
            )
          })
        }
      </div>
    </div>
  )
}