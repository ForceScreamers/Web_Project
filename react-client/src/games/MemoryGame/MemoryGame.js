import { useEffect, useState, useRef } from "react";
import Card from "./Card";
import "./app.scss";
import img from '../TestGame/Images/download.jpg'

let gameCards = [];
for (let i = 0; i < 16; i++) {
  gameCards[i] = {
    type: 1,
    //image: "image"
  }
}

gameCards[0].type = 1;
gameCards[1].type = 1;

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

export default function MemoryGame() {
  const [cards, setCards] = useState(
    //shuffleCards.bind(null, gameCards.concat(gameCards))
    gameCards
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
    if (Object.keys(clearedCards).length === gameCards.length) {
      console.log("Done!");
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();

    if (cards[first].type === cards[second].type) {// If the types match

      //  Update cleared cards with the newly opened cards
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));

      //  Reset open cards
      setOpenCards([]);
      return;
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

  const checkIsFlipped = (index) => { return openCards.includes(index) };
  const checkIsInactive = (card) => { return Boolean(clearedCards[card.type]) };

  return (
    <div>
      <header>
        <h3>Play the Flip card game</h3>
        <div>
          Select two cards with same content consequtively to make them vanish
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
            />
          );
        })}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
        </div>
      </footer>
    </div>
  );
}