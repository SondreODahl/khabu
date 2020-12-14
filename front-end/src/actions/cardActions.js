import _ from 'lodash';
import {
  ADD_CARD,
  ADD_CARD_TO_HAND,
  CARD_GLOW,
  DISCARD_CARD,
  DRAW_FROM_DECK,
  FORCE_DRAW,
  REMOVE_CARD_FROM_HAND,
  SWAP_CARDS,
  TRANSFER_CARD,
  UPDATE_CARD,
} from './types';

/*
  All actions related to the cards in the game. 
  forcePlayerDraw - Forces a player to draw an extra, unknown, card. 
  cardGlow - Toggles a glow on a card and untoggles it after a timeout.
  revealCard - Displays the actual value of a card.
  drawFromDeckAndRegisterCard - Adds a new card to the Ids and sets it as temporary card. Can be known or unknown. 
  playerDrewFromDeck - Received from public actions. Only used when you are not the current player. Makes temp card unknown.
*/

// ----------- Basic Action creators used for the more complex ones ------------------

export const addCardToHand = (cardId, playerId, index) => {
  return { type: ADD_CARD_TO_HAND, payload: { cardId, playerId, index } };
};

export const addCardToIds = (cardId, value) => {
  return { type: ADD_CARD, payload: { cardId, value } };
};

export const drawFromCardDeck = (cardId, value) => {
  return { type: DRAW_FROM_DECK, payload: { cardId, value } };
};

export const discardCard = (cardId, value) => {
  return { type: DISCARD_CARD, payload: { cardId, value } };
};

export const forceDraw = (playerId, cardId, value = null) => {
  return { type: FORCE_DRAW, payload: { playerId, cardId, value } };
};

export const removeCardFromHand = (cardId, playerId) => {
  return { type: REMOVE_CARD_FROM_HAND, payload: { cardId, playerId } };
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

export const updateCard = (cardId, value) => {
  return { type: UPDATE_CARD, payload: { cardId, value } };
};

// ---------------------- Thunk Action creators --------------------------

export const forcePlayerDraw = (playerId) => (dispatch, getState) => {
  const cardId = getHighestCardId(getState) + 1; // Only need to know cardId.
  dispatch(forceDraw(playerId, cardId));
};

export const cardGlow = (cardId) => (dispatch) => {
  const TIMEOUT = 1000;
  dispatch(toggleCardGlow(cardId, true));
  setTimeout(() => dispatch(toggleCardGlow(cardId, false)), TIMEOUT); // Automatically untoggles
};

export const revealCard = (playerId, cardId, value) => (dispatch, getState) => {
  const playerCards = getState().cards[playerId]; // List of card Ids
  const revealedCard = playerCards[cardId]; // Id is the index of the card. Relative in back-end
  dispatch(updateCard(revealedCard, value));
};

// Either called directly by delegator (private) or from playerDrewFromDeck (public)
export const drawFromDeckAndRegisterCard = (value) => (dispatch, getState) => {
  const newId = getHighestCardId(getState) + 1;
  dispatch(addCardToIds(newId, value));
  dispatch(drawFromCardDeck(newId, value));
};

export const playerDrewFromDeck = () => (dispatch, getState) => {
  const currentPlayer = getState().turn.currentPlayerTurn;
  const yourId = getState().players.yourId;
  if (!(currentPlayer === yourId)) {
    // If it is your Id, then drawFromDeckAndRegisterCard will already occur from private action delegator
    dispatch(drawFromDeckAndRegisterCard(null)); // Value is hidden from you
  }
};

// Helper method to find the currently highest cardId in frontend
export const getHighestCardId = (getState) => {
  const currentIds = getState().cards.byId; // TODO: Replace with allIds?
  const keysArray = _.keys(currentIds);
  const intArray = keysArray.map(Number);
  return _.max(intArray);
};
