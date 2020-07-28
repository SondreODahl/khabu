import { DISCARD_CARD, END_TURN, PLAYER_CALLED_KHABU } from './types';
import { addCardToIds } from './cardActions';

export const playerCalledKhabu = (playerId, nextPlayerId) => {
  return { type: PLAYER_CALLED_KHABU, payload: { playerId, nextPlayerId } };
};
export const playerEndedTurn = (nextPlayerId) => {
  return { type: END_TURN, payload: nextPlayerId };
};
export const discardCard = (cardId) => {
  return { type: DISCARD_CARD, payload: { cardId } };
};

export const playerDiscardedCard = (value) => (dispatch, getState) => {
  const tempCardId = getState().cards.temporaryCard;
  dispatch(addCardToIds(tempCardId, value)); // Update the card value so it is visible
  dispatch(discardCard(tempCardId)); // Add to discard pile ids and reset temp card
};
