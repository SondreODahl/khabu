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
  removeCardFromHand,
  swapCards,
} from './cardActions';
import { endTurn } from './turnActions';
import { roundEnd } from './roundActions';

export const playerCalledKhabu = (playerId, nextPlayerId) => {
  return { type: PLAYER_CALLED_KHABU, payload: { playerId, nextPlayerId } };
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

const putCard = (agent, victim, victimCardId, status, value) => {
  return { type: PUT_CARD, payload: { agent, victim, victimCardId, status, value } };
};

const putReverse = (agent, prevState) => {
  return { type: PUT_REVERSE, payload: { agent, prevState } };
};

const putFail = (agent, victim, victimCard, value) => (dispatch, getState) => {
  const prevState = getState().gameState.currentState;
  const victimCardId = getState().cards[victim][victimCard];
  const DISC_PILE_TIMEOUT = 2000;
  setTimeout(() => {
    dispatch(putReverse(agent, prevState)); // Reverse gameState and remove discardPile top deck
    dispatch(addCardToIds(victimCardId, null)); // Rehide the previous card
    dispatch(addCardToHand(victimCardId, victim, 0)); // Add the lost card back to the player
    const drawnCardId = getHighestId(getState);
    // Should not trigger draw_from_deck action as this should happen automatically and not enter new state
    dispatch(addCardToIds(drawnCardId, null)); // The drawn card is hidden
    dispatch(addCardToHand(drawnCardId, agent, 0)); // Player who failed is punished with a card
  }, DISC_PILE_TIMEOUT);
  dispatch(removeCardFromHand(victimCardId, victim));
  dispatch(addCardToIds(victimCardId, value));
  dispatch(putCard(agent, victim, victimCardId, 'fail', value));
};

const putSuccess = (agent, victim, victimCard, value) => (dispatch, getState) => {
  const victimCardId = getState().cards[victim][victimCard];
  dispatch(removeCardFromHand(victimCardId, victim));
  dispatch(addCardToIds(victimCardId, value));
  dispatch(putCard(agent, victim, victimCardId, 'success', value));
};
