import {
  ADD_CARD,
  ADD_CARD_TO_HAND,
  DISCARD_CARD,
  DRAW_FROM_DECK,
  REMOVE_CARD_FROM_HAND,
} from './types';
import _ from 'lodash';

export const addCardToIds = (id, value) => {
  return { type: ADD_CARD, payload: { id, value } };
};
export const revealCard = (playerId, cardId, value) => (dispatch, getState) => {
  const playerCards = getState().cards[playerId]; // List of card Ids
  const revealedCard = playerCards[cardId]; // Id is the index of the card. Relative in back-end
  dispatch(addCardToIds(revealedCard, value));
};
export const addCardToHand = (cardId, playerId) => {
  return { type: ADD_CARD_TO_HAND, payload: { cardId, playerId } };
};
export const removeCardFromHand = (cardId, playerId) => {
  return { type: REMOVE_CARD_FROM_HAND, payload: { cardId, playerId } };
};
export const discardCard = () => {
  return { type: DISCARD_CARD };
};
export const drawFromCardDeck = (cardId, value) => {
  return { type: DRAW_FROM_DECK, payload: { cardId, value } };
};
export const DrawFromDeckAndRegisterCard = (value) => (dispatch, getState) => {
  const newId = getHighestId(getState);
  dispatch(addCardToIds(newId, value));
  dispatch(drawFromCardDeck(newId, value));
};

// HELPER METHOD
const getHighestId = (getState) => {
  const currentIds = getState().cards.byId;
  const maxKey = _.maxBy(_.keys(currentIds), (o) => currentIds[o]);
  return maxKey + 1; // One higher than current highest
};
