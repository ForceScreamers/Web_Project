import { useEffect, useState, useRef } from "react";
import Card from "../MemoryGame/Card";
import "./memoryGameStyles.scss";
import { GAME_DIFFICULTY } from "../../Constants";
import GetCardsDataFromJsonByDifficulty from "../CardDataManipulations/ExtractFromJsonClass";


const CARD_COUNT = 16;
let isDone = false;
let typeCounter = 0;


function CardsJSONToCardsArray(jsonCards, difficulty) {
  console.log(jsonCards)
  let jsonData = GetCardsDataFromJsonByDifficulty(jsonCards, difficulty)

  //  Convert to array
  let cardsDataList = [];

  for (let card in jsonData) {
    cardsDataList.push(jsonData[card]);
  }
  return cardsDataList;
}

function SplitCardProperties(cardsArray) {
  //	Split each object's properties into array
  let cardTexts = [];

  for (let card of cardsArray) {
    for (let prop in card) {
      cardTexts.push(card[prop]);
    }
  }

  return cardTexts;
}



function GenerateGameCards(jsonCards, difficulty) {
  console.log("Halloo")

  let gameCards = CardsJSONToCardsArray(jsonCards, difficulty);
  let cardTexts = SplitCardProperties(gameCards);

  for (let i = 0; i < CARD_COUNT; i++) {
    gameCards[i] = {
      type: typeCounter,
      value: cardTexts[i]
    }

    if (i % 2 !== 0) {
      typeCounter++;
    }
  }

  console.log(gameCards)
  return gameCards;
}

const CARD_CLOSING_DELAY = 500;
const EVALUATION_DELAY = 800;

function shuffleMemoryCards(array) {
  console.log.apply("Hallo")
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



export default function MemoryGame({ SetMoves, SetCorrectMoves, CardsJSON, SetHasEnded, Difficulty }) {

  console.log(Difficulty)
  const [cards, setCards] = useState(
    () => shuffleMemoryCards(GenerateGameCards(CardsJSON, Difficulty))
  );

  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);

  const timeout = useRef(null);

  //  Disable or enable (the user can't click) all cards while evaluating
  const disable = () => { setShouldDisableAllCards(true) };
  const enable = () => { setShouldDisableAllCards(false) };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === cards.length / 2) {
      console.log("Done!");
      SetHasEnded(true);
    }
    else {
      SetHasEnded(false);
    }
  };


  function Evaluate() {
    const [first, second] = openCards;
    enable();

    if (cards[first].type === cards[second].type) {// If the types match

      //  Update cleared cards with the newly opened card type
      //  Meaning there will be half the card count
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      console.log("Ok!")

      SetCorrectMoves((prevCorrectMoves) => prevCorrectMoves + 1)

      //  Reset open cards
      setOpenCards([]);

      return;
    }
    else {//  Picked a wrong couple
      console.log("not good")
    }

    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, CARD_CLOSING_DELAY);
  };

  //  Handle click
  const handleCardClick = (index) => {
    if (openCards.length === 1) {

      setOpenCards((prev) => [...prev, index]);

      //  Update move count
      SetMoves((moves) => moves + 1);

      disable();
    } else {
      clearTimeout(timeout.current);

      //  Open the clicked card
      setOpenCards([index]);
    }
  };

  //  Every time the open cards update
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(Evaluate, EVALUATION_DELAY);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  //  Every time the cleared cards update
  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (index) => { return openCards.includes(index) };
  const checkIsInactive = (card) => { return Boolean(clearedCards[card.type]) };

  return (
    <div>

      <div className="memory-game-main">
        <div className="memory-game-container">
          {cards.map((card, index) => {
            return (
              <Card
                key={index}
                Index={index}
                Card={card}
                IsDisabled={shouldDisableAllCards}
                IsInactive={checkIsInactive(card)}
                IsFlipped={checkIsFlipped(index)}
                OnClick={handleCardClick}
                Caption={cards[index].value}
              />
            );
          })}
        </div>
      </div>


    </div>
  );
}