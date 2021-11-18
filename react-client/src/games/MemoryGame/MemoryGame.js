import { useEffect, useState, useRef } from "react";
import Card from "./Card";
import "./app.scss";
import image from '../TestGame/Images/download.jpg'

const gameCards = new Array(16);
for (let i = 0; i < gameCards.length; i++) {
  gameCards[i] = image;
}
// const uniqueElementsArray = [
//   {
//     type: "Pikachu",
//     image: require(`./images/Pickachu.png`)
//   },
//   {
//     type: "ButterFree",
//     image: require(`./images/ButterFree.png`)
//   },
//   {
//     type: "Charmander",
//     image: require(`./images/Charmander.png`)
//   },
//   {
//     type: "Squirtle",
//     image: require(`./images/Squirtle.png`)
//   },
//   {
//     type: "Pidgetto",
//     image: require(`./images/Pidgetto.png`)
//   },
//   {
//     type: "Bulbasaur",
//     image: require(`./images/Bulbasaur.png`)
//   }
// ];

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
    shuffleCards.bind(null, gameCards)
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === 3) {
      //  Done?

    }
  };
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(cards));
  };

  return (
    <div className="App">
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
        <div className="restart">
          <button onClick={handleRestart} color="primary" variant="contained">
            Restart
          </button>
        </div>
      </footer>

    </div>
  );
}