import { useEffect, useState, useRef } from "react";
import Card from "./Card";
import "./app.scss";

const CARD_COUNT = 16;
let gameCards = new Array(CARD_COUNT);
let isDone = false;
//  TODO: change the typeCounter method to something nicer
let typeCounter = 0;

const GenerateGameCards = () => {
  for (let i = 0; i < gameCards.length; i++) {
    gameCards[i] = {
      type: typeCounter,
      //image: 
    }

    if (i % 2 != 0) {
      typeCounter++;
    }
  }
}

const CARD_CLOSING_DELAY = 100;
const EVALUATION_DELAY = 300;

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

GenerateGameCards();

export default function MemoryGame() {

  const [cards, setCards] = useState(
    shuffleCards.bind(null, gameCards)
    //gameCards
  );

  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const timeout = useRef(null);

  //  Disable or enable (the user can't click) all cards while evaluating
  const disable = () => { setShouldDisableAllCards(true) };
  const enable = () => { setShouldDisableAllCards(false) };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === gameCards.length / 2) {
      console.log("Done!");
    }
    isDone = true;
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();

    if (cards[first].type === cards[second].type) {// If the types match

      //  Update cleared cards with the newly opened card type
      //  Meaning there will be half the card count
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      console.log("Ok!")

      //  Reset open cards
      setOpenCards([]);

      //TODO: Figure out this return
      //return;
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
      setMoves((moves) => moves + 1);

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
      timeout = setTimeout(evaluate, EVALUATION_DELAY);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  //  Every time the cleared cards update
  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  useEffect(() => {
    //console.log("Game loaded")
  })

  const checkIsFlipped = (index) => { return openCards.includes(index) };
  const checkIsInactive = (card) => { return Boolean(clearedCards[card.type]) };

  return (
    <div>
      <header>
        <h3>שלום</h3>
        <div>
          הוראות יהיו פה
        </div>
      </header>
      <div className="container">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
              cardType={cards[index].type}
            />
          );
        })}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">מהלכים:</span> {moves}
          </div>
        </div>
      </footer>
    </div>
  );
}