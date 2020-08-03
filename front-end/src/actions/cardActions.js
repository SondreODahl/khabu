import {
  ADD_CARD,
  ADD_CARD_TO_HAND,
  DISCARD_CARD,
  DRAW_FROM_DECK,
  FORCE_DRAW,
  REMOVE_CARD_FROM_HAND,
  SWAP_CARDS,
  CARD_GLOW,
  TRANSFER_CARD,
  UPDATE_CARD,
} from './types';
import _ from 'lodash';

export const addCardToIds = (cardId, value) => {
  return { type: ADD_CARD, payload: { cardId, value } };
};
export const updateCard = (cardId, value) => {
  return { type: UPDATE_CARD, payload: { cardId, value } };
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
export const transferCard = (victim, victimCardIndex, agent, cardId) => {
  return {
    type: TRANSFER_CARD,
    payload: { victim, victimCardIndex, agent, cardId },
  };
};
export const toggleCardGlow = (cardId, glow) => {
  return { type: CARD_GLOW, payload: { cardId, glow } };
};
export const forceDraw = (playerId) => (dispatch, getState) => {
  const cardId = getHighestId(getState) + 1;
  dispatch({ type: FORCE_DRAW, payload: { playerId, cardId } });
};

export const cardGlow = (cardId) => (dispatch) => {
  dispatch(toggleCardGlow(cardId, true));
  setTimeout(() => dispatch(toggleCardGlow(cardId, false)), 1000);
};

export const revealCard = (playerId, cardId, value) => (dispatch, getState) => {
  const playerCards = getState().cards[playerId]; // List of card Ids
  const revealedCard = playerCards[cardId]; // Id is the index of the card. Relative in back-end
  dispatch(updateCard(revealedCard, value));
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
    dispatch(drawFromDeckAndRegisterCard(null)); //G Value is then hidden from you
  }
};
// HELPER METHOD
export const getHighestId = (getState) => {
  const currentIds = getState().cards.byId;
  const keysArray = _.keys(currentIds);
  const intArray = keysArray.map(Number);
  return _.max(intArray);
};
