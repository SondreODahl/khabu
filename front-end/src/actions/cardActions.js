import { ADD_CARD, ADD_CARD_TO_HAND } from './types';

export const addCardToIds = (id, value) => {
  return { type: ADD_CARD, payload: { id, value } };
};

export const revealCard = (id, value) => {
  return addCardToIds(id, value);
};

export const addCardToHand = (cardId, playerId) => {
  return { type: ADD_CARD_TO_HAND, payload: { cardId, playerId } };
};
