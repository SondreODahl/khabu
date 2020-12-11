import { PLAYER_CALLED_KHABU, PUT_CARD, PUT_REVERSE } from './types';
import {
  cardGlow,
  discardCard,
  forceDraw,
  swapCards,
  transferCard,
} from './cardActions';

export const playerCalledKhabu = (nextPlayerId) => (dispatch, getState) => {
  const playerId = getState().turn.currentPlayerTurn;
  dispatch({ type: PLAYER_CALLED_KHABU, payload: { playerId, nextPlayerId } });
};
export const playerDiscardedCard = (value) => (dispatch, getState) => {
  const tempCardId = getState().cards.temporaryCard;
  dispatch(discardCard(tempCardId, value)); // Add to discard pile ids and reset temp card
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

export const playerTransferredCard = (victim, victimCardIndex, agentCardIndex) => (
  dispatch,
  getState
) => {
  const agent = getState().turn.currentPuttingPlayer; // Always current putting player that transfers
  const agentCardId = getState().cards[agent][agentCardIndex]; // Need id to put it in other player's hand
  dispatch(transferCard(victim, victimCardIndex, agent, agentCardId));
};

export const playerPutCard = (agent, victim, victimCard, status, value) => (
  dispatch,
  getState
) => {
  const cardValue = parseInt(value);
  const victimCardId = getState().cards[victim][victimCard];
  if (status === 'fail') {
    const nextState = getState().gameState.currentState;
    const DISC_PILE_TIMEOUT = 2000;
    setTimeout(() => {
      dispatch(putReverse(agent, victim, victimCardId, victimCard, nextState)); // Reverse gameState and remove discardPile top deck
      dispatch(forceDraw(agent));
    }, DISC_PILE_TIMEOUT);
  }
  dispatch(putCard(agent, victim, victimCardId, status, cardValue));
};

const putCard = (agent, victim, cardId, status, value) => {
  return { type: PUT_CARD, payload: { agent, victim, cardId, status, value } };
};

const putReverse = (agent, victim, cardId, index, nextState) => {
  return { type: PUT_REVERSE, payload: { agent, victim, cardId, value: null, index, nextState } };
};
