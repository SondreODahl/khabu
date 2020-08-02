import {
  DISCARD_CARD,
  END_TURN,
  PLAYER_CALLED_KHABU,
  PUT_CARD,
  PUT_REVERSE,
  SWAP_CARDS,
} from './types';
import {
  addCardToHand,
  addCardToIds,
  addNewCardToIds,
  cardGlow,
  discardCard,
  getHighestId,
  forceDraw,
  removeCardFromHand,
  swapCards,
  updateCard,
} from './cardActions';
import { endTurn } from './turnActions';
import { roundEnd } from './roundActions';

export const playerCalledKhabu = (playerId, nextPlayerId) => {
  return { type: PLAYER_CALLED_KHABU, payload: { playerId, nextPlayerId } };
};
export const playerDiscardedCard = (value) => (dispatch, getState) => {
  const tempCardId = getState().cards.temporaryCard;
  dispatch(updateCard(tempCardId, value)); // Update the card value so it is visible
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
  dispatch(cardGlow(tempCardId));
};

export const playerEndedTurn = (nextPlayerId, roundOver) => {
  if (roundOver) return roundEnd();
  else return endTurn(nextPlayerId);
};

export const playerPutCard = (agent, victim, victimCard, status, value) => {
  const cardValue = parseInt(value);
  if (status === 'fail') {
    return putFail(agent, victim, victimCard, cardValue);
  } else if (status === 'success') {
    return putSuccess(agent, victim, victimCard, cardValue);
  } else alert(`playerPutCard called with status ${status}`);
};

const putCard = (agent, victim, cardId, status, value) => {
  return { type: PUT_CARD, payload: { agent, victim, cardId, status, value } };
};

const putReverse = (agent, victim, cardId, index, prevState) => {
  return { type: PUT_REVERSE, payload: { agent, victim, cardId, index, prevState } };
};

const putFail = (agent, victim, victimCard, value) => (dispatch, getState) => {
  const prevState = getState().gameState.currentState;
  const victimCardId = getState().cards[victim][victimCard];
  const DISC_PILE_TIMEOUT = 2000;
  setTimeout(() => {
    dispatch(putReverse(agent, victim, victimCardId, victimCard, prevState)); // Reverse gameState and remove discardPile top deck
    dispatch(forceDraw(agent));
  }, DISC_PILE_TIMEOUT);
  dispatch(putCard(agent, victim, victimCardId, 'fail', value));
};

const putSuccess = (agent, victim, victimCard, value) => (dispatch, getState) => {
  const victimCardId = getState().cards[victim][victimCard];
  dispatch(putCard(agent, victim, victimCardId, 'success', value));
};
