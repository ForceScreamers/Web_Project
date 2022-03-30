import { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import MatchCard from '../MatchCardsGame/MatchCard'
import cardsDataJson from './CardMatchList.json'

let cardsDataList = [];
for (let card in cardsDataJson) {
	cardsDataList.push(cardsDataJson[card]);
}

const CARD_COUNT = 16;
let gameCards = new Array(CARD_COUNT);
let isDone = false;
//  TODO: change the typeCounter method to something nicer
let typeCounter = 0;

console.log(cardsDataList);

//	Split each object's properties into array
let cardTexts = [];
for (let card of cardsDataList) {
	for (let prop in card) {
		cardTexts.push(card[prop]);
	}
}


const GenerateGameCards = () => {
	console.log(cardsDataList);
	for (let i = 0; i < gameCards.length; i++) {
		gameCards[i] = {
			type: typeCounter,
			value: cardTexts[i]
		}

		if (i % 2 !== 0) {
			typeCounter++;
		}
	}

	console.log(gameCards)
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
export default function MemoryGame({ SetHasEnded, SetMoves, SetCorrectMoves, CardsJSON }) {

	const [cards, setCards] = useState(
		shuffleCards.bind(null, gameCards)
		//gameCards

	);



	const [openCards, setOpenCards] = useState([]);
	const [clearedCards, setClearedCards] = useState({});
	const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
	//const [moves, setMoves] = useState(0);
	const timeout = useRef(null);

	//  Disable or enable (the user can't click) all cards while evaluating
	const disable = () => { setShouldDisableAllCards(true) };
	const enable = () => { setShouldDisableAllCards(false) };


	function CheckCompletion() {
		if (Object.keys(clearedCards).length === gameCards.length / 2) {
			console.log("Done!");
			SetHasEnded(true);
		}
		isDone = true;
	};


	function Evaluate() {
		const [first, second] = openCards;
		enable();

		if (cards[first].type === cards[second].type) {// If the types match

			//  Update cleared cards with the newly opened card type
			//  Meaning there will be half the card count
			setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));

			SetCorrectMoves((prevCorrectMoves) => prevCorrectMoves + 1);
			//  Reset open cards
			setOpenCards([]);

			//return;
		}
		else {//  Picked a wrong couple
			console.log("not good")
		}

		timeout.current = setTimeout(() => {
			setOpenCards([]);
		}, CARD_CLOSING_DELAY);
	};

	//  Handle click
	function HandleCardClick(index) {
		if (openCards.length === 1) {

			setOpenCards((prev) => [...prev, index]);

			//  Update move count
			SetMoves((prevMoves) => prevMoves + 1);

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
		CheckCompletion();
	}, [clearedCards]);

	const checkIsSelected = (index) => { return openCards.includes(index) };
	const checkIsInactive = (card) => { return Boolean(clearedCards[card.type]) };

	return (
		<div className="d-flex flex-column">
			<header>
				<h3>שלום</h3>
			</header>

			<Container className="match-cards-container">
				{cards.map((card, index) => {
					return (
						<MatchCard
							key={index}
							Type={card.value.type}
							Index={index}
							IsDisabled={shouldDisableAllCards}
							IsInactive={checkIsInactive(card)}
							IsSelected={checkIsSelected(index)}
							OnClick={HandleCardClick}
							Caption={cards[index].value}
						/>
					);
				})}
			</Container>
		</div>
	);
}