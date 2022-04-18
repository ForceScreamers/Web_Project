import { GAME_DIFFICULTY } from "../../Constants";

export default function GetCardsDataFromJsonByDifficulty(jsonCards, difficulty) {
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