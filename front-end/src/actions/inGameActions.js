import { DISCARD_CARD, END_TURN, PLAYER_CALLED_KHABU, SWAP_CARDS } from './types';
import {
  addCardToHand,
  addCardToIds,
  discardCard,
  removeCardFromHand,
  swapCards,
} from './cardActions';

export const playerCalledKhabu = (playerId, nextPlayerId) => {
  return { type: PLAYER_CALLED_KHABU, payload: { playerId, nextPlayerId } };
};
export const playerEndedTurn = (nextPlayerId) => {
  return { type: END_TURN, payload: nextPlayerId };
};
export const playerDiscardedCard = (value) => (dispatch, getState) => {
  const tempCardId = getState().cards.temporaryCard;
  dispatch(addCardToIds(tempCardId, value)); // Update the card value so it is visible
  dispatch(discardCard(tempCardId)); // Add to discard pile ids and reset temp card
};

export const playerSwappedCard = (targetCardIndex, value) => (
  dispatch,
  getState
) => {
  const playerId = getState().turn.currentPlayerTurn; // Only the current player will be able to swap
  const tempCardId = getState().cards.temporaryCard;
  const cardId = getState().cards[playerId][targetCardIndex];
  dispatch(swapCards(playerId, cardId, tempCardId, value));
};
