import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { GAME_DIFFICULTY } from '../../Constants';
import Randoms from '../../Randoms';
import GetCardsDataFromJsonByDifficulty from '../CardDataManipulations/ExtractFromJsonClass';
import ShuffleCards from '../CardDataManipulations/ShuffleCards';
import './AssociationsGameStyles.css'

//TODO: Get more cards
//* Code finished

const IMAGE_COUPLE_VALUE_INSIDE_JSON = 1;

function GetMaxRoundsByDifficulty(jsonCards, difficulty) {
  if (difficulty === GAME_DIFFICULTY.EASY)
    return jsonCards.difficulty1.maxRounds;
  if (difficulty === GAME_DIFFICULTY.MEDIUM)
    return jsonCards.difficulty2.maxRounds;
  if (difficulty === GAME_DIFFICULTY.HARD)
    return jsonCards.difficulty3.maxRounds;
}

function GenerateCards(jsonCards, difficulty) {
  let cards = GetCardsDataFromJsonByDifficulty(jsonCards, difficulty).cards;
  cards = ShuffleCards(cards);
  cards = SetImageOfCoupleAsFirst(cards);

  return cards;
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
      console.log(card)
      couple.push(card);
    }
  }

  return couple;
}

export default function AssociationsGame({ SetMoves, SetCorrectMoves, SetHasEnded, CardsJSON, Difficulty }) {

  const [cards, setCards] = useState(
    () => GenerateCards(CardsJSON, Difficulty)
  );

  const MAX_ROUNDS = GetMaxRoundsByDifficulty(CardsJSON, Difficulty);

  const [isCardCorrect, setIsCardCorrect] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null)
  const [roundNumber, setRoundNumber] = useState(0);

  const [showContinueButton, setShowContinueButton] = useState(false);
  const [cardsDisabled, setCardsDisabled] = useState(false);

  function HandleCardClick(card) {
    if (IsCardPlaceholder(card) === false && cardsDisabled === false) {
      setSelectedCard(card);

      EvaluateSelectedCard(card);

      WaitForContine()
    }
  }

  function WaitForContine() {
    DisableCards();
    ShowContinueButton();
  }

  function EvaluateSelectedCard(card) {
    if (card.value === IMAGE_COUPLE_VALUE_INSIDE_JSON) {
      setIsCardCorrect(true);

      //  Increment correct moves
      SetCorrectMoves((prevCorrectMoves) => prevCorrectMoves + 1);
    }
    else {
      setIsCardCorrect(false);
    }
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
    return selectedCard === card;
  }

  function IsCardPlaceholder(card) {
    return card.value === -1;
  }


  function DisableCards() { setCardsDisabled(true); }
  function EnableCards() { setCardsDisabled(false); }

  function ShowContinueButton() { setShowContinueButton(true); }
  function HideContinueButton() { setShowContinueButton(false); }


  function StartNewRound() {
    EnableCards();
    HideContinueButton();

    setCards(GenerateCards(CardsJSON, Difficulty));
    setSelectedCard(null);
    setIsCardCorrect(null);

    //  Increment round number
    setRoundNumber((prevRoundNumber) => prevRoundNumber + 1);
  }

  function GetBorderStyleByCard(card) {
    const THICKNESS = "5px";

    const CORRECT_SELECTION_COLOR = "lightgreen";
    const WRONG_SELECTION_COLOR = "red";

    let borderColor = "transparent";

    if (IsSelected(card) && !IsCardPlaceholder(card)) {
      if (isCardCorrect) {
        borderColor = CORRECT_SELECTION_COLOR;
      }
      else {
        borderColor = WRONG_SELECTION_COLOR;
      }
    }

    return `solid ${borderColor} ${THICKNESS}`
  }

  function GetCursorByCard(card) {
    if (IsCardPlaceholder(card)) {
      return "default";
    }
    else {
      return "pointer";
    }
  }

  return (
    <div className="associations-container">

      <div className='d-flex justify-content-center align-items-center'>
        <h1>{roundNumber}/{MAX_ROUNDS}</h1>
      </div>

      {/* Arrange images in a circle with one image always in the middle */}
      {
        cards.map((card, index) => {
          if (index > 0) {

            return (
              <div className="associations-image-container" style={{ border: GetBorderStyleByCard(card), cursor: GetCursorByCard(card) }}>
                <img
                  key={index} alt="doggo"
                  src={card.source}
                  className="associations-image"
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


      <div className="associations-image-container" style={{ border: "solid transparent 5px" }}>
        <img alt="center" src={cards[0].source} className="associations-image" />
      </div>

      <div className='d-flex justify-content-center align-items-center flex-column'>
        <h1 hidden={isCardCorrect === null}>{isCardCorrect ? "נכון" : "לא נכון"}</h1>
        <Button hidden={showContinueButton === false} onClick={StartNewRound}>המשך</Button>
      </div>
    </div>
  )
}


