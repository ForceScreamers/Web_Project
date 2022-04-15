import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { GAME_DIFFICULTY } from '../../Constants';
import Randoms from '../../Randoms';
import './AssociationsGameStyles.css'


const IMAGE_COUPLE_VALUE_INSIDE_JSON = 1;

function GetCardsDataByDifficulty(jsonCards, difficulty) {
  console.log(jsonCards.associationsDifficulty1[1])

  //TODO: Fix below or create class for extracting json data
  if (difficulty === GAME_DIFFICULTY.EASY) {
    let arr = [];
    for (let card in jsonCards.associationsDifficulty1) {
      arr.push(jsonCards.associationsDifficulty1[card]);
    }
    return arr;
    // return jsonCards.associationsDifficulty1;
  }
  if (difficulty === GAME_DIFFICULTY.MEDIUM) {
    return jsonCards.associationsDifficulty2;
  }
  if (difficulty === GAME_DIFFICULTY.HARD) {
    return jsonCards.associationsDifficulty3;
  }
}

function GenerateGameCards(jsonCards, difficulty) {

  let jsonData = GetCardsDataByDifficulty(jsonCards, difficulty)

  return jsonData;
}


//TODO: Finish associaitons game

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function SetImageOfCoupleAsFirst(cardsArray) {

  let couple = GetCoupleCards(cardsArray);
  let randomCardOfCouple = couple[Randoms.GetRandomInt(0, couple.length - 1)]

  //  Return the first card of a couple as the center card
  let copyCardsArray = [...cardsArray];
  let tempCard = copyCardsArray.splice(copyCardsArray.indexOf(randomCardOfCouple), 1)[0];

  return [tempCard, ...copyCardsArray];
}

function GetCoupleCards(cardsArray) {
  let couple = [];
  for (let card of cardsArray) {
    if (card.value === IMAGE_COUPLE_VALUE_INSIDE_JSON) {
      couple.push(card);
    }
  }

  return couple;
}

export default function AssociationsGame({ SetMoves, SetCorrectMoves, SetHasEnded, CardsJSON, Difficulty }) {

  const [images, setCards] = useState(
    () => SetImageOfCoupleAsFirst(
      shuffleCards(GenerateGameCards(CardsJSON, Difficulty))
    )
  );



  return (
    <div className="associations-container">
      {/* Arrange images in a circle with one image always in the middle */}



      {
        images.map((image, index) => {
          if (index > 0) {

            return (
              <div className="associations-image-container">
                <img key={index} alt="doggo" src={image.source} className="associations-image" /*width={300} height={300}*/ />
              </div>
            )
          }
          else {
            return <></>
          }
        })
      }
      <div className="associations-image-container">
        <img alt="center" src={images[0].source} className="associations-image" />
      </div>

    </div>
  )
}


