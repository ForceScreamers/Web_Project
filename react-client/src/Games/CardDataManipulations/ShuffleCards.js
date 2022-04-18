/**
 * Shuffles a given array of cards
 * @param {*} cards 
 * @returns {Array<*>} An array containing the shuffled cards
 */
export default function ShuffleCards(cards) {
  const length = cards.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
  return cards;
}