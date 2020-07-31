import {
  ADD_CARD,
  ADD_CARD_TO_HAND,
  DISCARD_CARD,
  DRAW_FROM_DECK,
  REMOVE_CARD_FROM_HAND,
  SWAP_CARDS,
  TOGGLE_GLOW,
} from './types';
import _ from 'lodash';

export const addCardToIds = (id, value) => {
  return { type: ADD_CARD, payload: { id, value } };
};
export const addCardToHand = (cardId, playerId, index) => {
  return { type: ADD_CARD_TO_HAND, payload: { cardId, playerId, index } };
};
export const removeCardFromHand = (cardId, playerId) => {
  return { type: REMOVE_CARD_FROM_HAND, payload: { cardId, playerId } };
};
export const discardCard = (cardId) => {
  return { type: DISCARD_CARD, payload: { cardId } };
};
export const drawFromCardDeck = (cardId, value) => {
  return { type: DRAW_FROM_DECK, payload: { cardId, value } };
};
export const swapCards = (playerId, cardId, tempCardId, value) => {
  return { type: SWAP_CARDS, payload: { playerId, cardId, tempCardId, value } };
};
export const toggleCardGlow = (cardId) => {
  return { type: TOGGLE_GLOW, payload: { cardId } };
};

export const cardGlow = (cardId) => (dispatch) => {
  dispatch(toggleCardGlow(cardId));
  setTimeout(() => dispatch(toggleCardGlow(cardId)), 1000);
};

export const revealCard = (playerId, cardId, value) => (dispatch, getState) => {
  const playerCards = getState().cards[playerId]; // List of card Ids
  const revealedCard = playerCards[cardId]; // Id is the index of the card. Relative in back-end
  dispatch(addCardToIds(revealedCard, value));
};
export const drawFromDeckAndRegisterCard = (value) => (dispatch, getState) => {
  const newId = getHighestId(getState) + 1;
  dispatch(addCardToIds(newId, value));
  dispatch(drawFromCardDeck(newId, value));
};
export const playerDrewFromDeck = () => (dispatch, getState) => {
  const currentPlayer = getState().turn.currentPlayerTurn;
  const yourId = getState().players.yourId;
  if (!(currentPlayer === yourId)) {
    // If it is your Id, then drawFromDeckAndRegisterCard will occur
    dispatch(drawFromDeckAndRegisterCard(null)); // Value is then hidden from you
  }
};
// HELPER METHOD
export const getHighestId = (getState) => {
  const currentIds = getState().cards.byId;
  const keysArray = _.keys(currentIds);
  const intArray = keysArray.map(Number);
  return _.max(intArray);
};
