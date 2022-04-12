import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { GAME_DIFFICULTY } from '../../Constants';
import Randoms from '../../Randoms';
import './AssociationsGameStyles.css'


const IMAGE_COUPLE_VALUE = 1;

function GetCardsDataByDifficulty(jsonCards, difficulty) {
  if (difficulty === GAME_DIFFICULTY.EASY) {
    return jsonCards.difficulty1;
  }
  if (difficulty === GAME_DIFFICULTY.MEDIUM) {
    return jsonCards.difficulty2;
  }
  if (difficulty === GAME_DIFFICULTY.HARD) {
    return jsonCards.difficulty3;
  }
}

function GenerateGameCards(jsonCards, difficulty) {

  let jsonData = GetCardsDataByDifficulty(jsonCards, difficulty)
  console.log(jsonData);
  let e = [];

  console.log(e);

  for (let card in jsonData) {
    console.log(jsonData[card])
    e.push(jsonData[card]);
  }

  console.log(e)
  console.log(jsonData)
  return jsonData
}



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

//TODO: WTF
function SetImageOfCoupleAsFirst(cardsArray) {
  let copyCardsArray;

  let couple = GetCoupleCards(cardsArray);
  let randomCardOfCouple = couple[Randoms.GetRandomInt(0, couple.length - 1)]


  //  Set the first card of a couple as the center card
  let tempCard = cardsArray.splice(cardsArray.indexOf(randomCardOfCouple), 1);
  console.log(cardsArray);
  console.log(randomCardOfCouple)

  copyCardsArray = [...cardsArray];
  copyCardsArray.push(tempCard);


  console.log(copyCardsArray);
  return copyCardsArray;
}

function GetCoupleCards(cardsArray) {
  let couple = [];
  for (let card of cardsArray) {
    if (card.value === IMAGE_COUPLE_VALUE) {
      couple.push(card);
    }
  }

  console.log(couple);
  return couple;
}

export default function AssociationsGame({ SetMoves, SetCorrectMoves, SetHasEnded, CardsJSON, Difficulty }) {

  const [images, setCards] = useState(
    () => SetImageOfCoupleAsFirst(
      shuffleCards(GenerateGameCards(CardsJSON, Difficulty))
    )
  );

  console.log(images[0].value);

  // SetMoves
  // SetCorrectMoves
  // SetHasEnded
  // HasUserEndedGame
  // CardsJSON
  // Difficulty


  return (
    <div className="associations-container">
      {/* Arrange images in a circle with one image always in the middle */}

      <div className="associations-image">
        <img alt="center" src={images[0].source} width={300} height={300} />
      </div>

      {
        images.map((image, index) => {
          if (index > 0) {

            return (
              <div className="associations-image">
                <img key={index} alt="doggo" src={image.source} width={300} height={300} />
              </div>
            )
          }
          else {
            return <></>
          }
        })
      }

    </div>
  )
}


