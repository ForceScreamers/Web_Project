import React from 'react'
import { Container } from 'react-bootstrap'
import MatchCard from '../MatchCardsGame/MatchCard'
import { useState } from 'react';
import { useEffect } from 'react';


//  TODO Change class name
class MatchCardData {
  constructor(text, index) {
    this.text = text;
    this.index = index;
  }
}

let items = [];

// Mock data - Initialize items (for testing)
for (let i = 0; i < 8; i++) {
  // names[i] = `name ${i + 1}`;
  items[i] = {
    name: `name ${i}`,
    img: `img ${i}`,
  }
}


function GenerateCards() {
  //  Initialize cards
  let tempCards = [];

  //  assign each card a name or img
  let itemIndex = 0;

  for (let i = 0; i < 16; i = i + 2) {
    //let tempCard;
    let itemName = items[itemIndex].name;
    let itemImg = items[itemIndex].img;

    tempCards.push(new MatchCardData(itemName, i));
    tempCards.push(new MatchCardData(itemImg, i + 1));

    itemIndex++;
  }

  return tempCards;
}

function ShuffleCards(array) {
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

//  Finish this
export default function MatchCardsGame() {
  const [moves, setMoves] = useState(0);

  const [cards, setCards] = useState([]);
  const [activeCards, setActiveCards] = useState([]);


  useEffect(() => {
    let generatedCards = GenerateCards();
    let shuffledCards = ShuffleCards(generatedCards);
    setCards(shuffledCards);

    console.log(cards);

  }, [])

  function HandleClick(index) {

    if (activeCards.length === 1) {

      setActiveCards((prev) => [...prev, index]);

      //  Update move count
      setMoves((moves) => moves + 1);

      //disable();
    } else {
      //clearTimeout(timeout.current);

      //  Open the clicked card
      setActiveCards([index]);
    }
  }

  function Evaluate() {
    console.log("Eval");
    const [first, second] = activeCards;


    console.log(cards[first], cards[second]);
  }

  //  Every time the open cards update
  useEffect(() => {
    let timeout = null;
    if (activeCards.length === 2) {
      timeout = setTimeout(Evaluate, 100);// Change number to const
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [activeCards]);


  function IsCardActive(index) {
    return activeCards.includes(index);
  }


  return (
    <div>
      <h1>התאמת קלפים</h1>

      <Container>
        {
          cards.map((card, keyIndex) => {
            return (
              <MatchCard
                key={keyIndex}
                Index={card.index}
                IsSelected={IsCardActive(card.index)}
                Text={card.text}
                OnClick={HandleClick}
              />
            )
          })
        }

      </Container>


    </div>
  )
}
