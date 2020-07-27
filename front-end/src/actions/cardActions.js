import { ADD_CARD, ADD_CARD_TO_HAND } from './types';

export const addCardToIds = (id, value) => {
  return { type: ADD_CARD, payload: { id, value } };
};

export const revealCard = (playerId, id, value) => (dispatch, getState) => {
  const playerCards = getState().cards[playerId]; // List of card Ids
  const revealedCard = playerCards[id]; // Id is the index of the card. Relative in back-end
  dispatch(addCardToIds(revealedCard, value));
};

export const addCardToHand = (cardId, playerId) => {
  return { type: ADD_CARD_TO_HAND, payload: { cardId, playerId } };
};
