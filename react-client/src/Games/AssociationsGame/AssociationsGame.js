import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { GAME_DIFFICULTY } from '../../Constants';
import Randoms from '../../Randoms';
import './AssociationsGameStyles.css'


const IMAGE_COUPLE_VALUE_INSIDE_JSON = 1;
const MAX_ROUNDS = jsonCards.maxRounds;


function GetCardsDataByDifficulty(jsonCards, difficulty) {
  console.log(jsonCards.associationsDifficulty1[1])

  //TODO: Fix below or create class for extracting json data
  if (difficulty === GAME_DIFFICULTY.EASY) {
    let arr = [];
    for (let card in jsonCards.associationsDifficulty1) {
      arr.push(jsonCards.associationsDifficulty1.cards[card]);
    }
    return arr;
  }
  if (difficulty === GAME_DIFFICULTY.MEDIUM) {
    return jsonCards.associationsDifficulty2;
  }
  if (difficulty === GAME_DIFFICULTY.HARD) {
    return jsonCards.associationsDifficulty3;
  }
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

  const [cards, setCards] = useState(
    () => SetImageOfCoupleAsFirst(
      shuffleCards(GetCardsDataByDifficulty(jsonCards, difficulty)(CardsJSON, Difficulty))
    )
  );


  const [isCardCorrect, setIsCardCorrect] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null)
  const [roundNumber, setRoundNumber] = useState(0);

  const [showContinueButton, setShowContinueButton] = useState(false);
  const [cardsDisabled, setCardsDisabled] = useState(false);

  function HandleCardClick(card) {

    if (IsCardPlaceholder(card) === false && cardsDisabled === false) {
      console.log("Click")
      EvaluateSelectedCard(card);
    }
  }

  function EvaluateSelectedCard(card) {
    setSelectedCard(card);
    DisableCards();

    if (card.value === IMAGE_COUPLE_VALUE_INSIDE_JSON) {
      setIsCardCorrect(true);

      //  Increment correct moves
      SetCorrectMoves((prevCorrectMoves) => prevCorrectMoves + 1);
    }
    else {
      setIsCardCorrect(false);
    }

    //  Increment round number
    setRoundNumber((prevRoundNumber) => prevRoundNumber + 1);

    setShowContinueButton(true);
  }


  useEffect(() => {

    //  Increment move count
    SetMoves((prevMoves) => prevMoves + 1);

    //  If the game has ended
    if (roundNumber === MAX_ROUNDS) {
      SetHasEnded(true);
    }
  }, [roundNumber])

  function IsSelected(card) {
    return selectedCard === card && IsCardPlaceholder(card) === false;
  }

  function IsCardPlaceholder(card) {
    return card.value === -1;
  }

  function DisableCards() { setCardsDisabled(true); }
  function EnableCards() { setCardsDisabled(false); }

  function StartNewRound() {
    EnableCards();
    setCards(shuffleCards(cards));// TODO: Grab new cards from JSON 
    setSelectedCard(null);
    setIsCardCorrect(null);
  }

  return (
    <div className="associations-container">
      {/* Arrange images in a circle with one image always in the middle */}

      <h1>{roundNumber}/{MAX_ROUNDS}</h1>


      {
        cards.map((card, index) => {
          if (index > 0) {

            return (
              <div className="associations-image-container" style={{ border: IsSelected(card) ? "solid lightgreen 5px" : "none" }}>
                <img
                  key={index} alt="doggo"
                  src={card.source}
                  className="associations-image" /*width={300} height={300}*/
                  onClick={() => HandleCardClick(card)}

                />
              </div>
            )
          }
          else {
            return <></>
          }
        })
      }
      <div className="associations-image-container">
        <img alt="center" src={cards[0].source} className="associations-image" />
      </div>

      <h1 hidden={isCardCorrect === null}>{isCardCorrect ? "נכון" : "לא נכון"}</h1>
      <Button hidden={showContinueButton === false} onClick={StartNewRound}>המשך</Button>

    </div>
  )
}


