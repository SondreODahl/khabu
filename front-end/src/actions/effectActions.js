import { ACTIVATE_EFFECT, CHECK_OPPONENT, CHOOSE_CARD_FOR_EFFECT } from './types';
import { revealCard, toggleCardGlow } from './cardActions';

export const activateEffect = () => {
  return { type: ACTIVATE_EFFECT };
};

export const chooseCardForEffect = (cardId, victimId) => {
  return { type: CHOOSE_CARD_FOR_EFFECT, payload: { cardId, victimId } };
};

export const checkOpponent = (victimId, cardId) => {
  return { type: CHECK_OPPONENT, payload: { victimId, cardId } };
};

export const playerChoseCard = (victimId, cardIndex) => (dispatch, getState) => {
  const cardId = getState().cards[victimId][cardIndex];
  dispatch(chooseCardForEffect(cardId, victimId));
  dispatch(toggleCardGlow(cardId, true));
};

export const playerExchangedCards = () => (dispatch, getState) => {
  const { cardOne, cardTwo } = getState().effects.chosenCards;
};

export const revealOpponent = (victim, victimCard, value) => (
  dispatch,
  getState
) => {
  const cardId = getState().cards[victim][victimCard];
  dispatch(revealCard(victim, victimCard, value));
  dispatch(checkOpponent(victim, cardId));
};

export const playerCheckedOpponent = (targetPlayerId, cardIndex) => (
  dispatch,
  getState
) => {
  const cardId = getState().cards[targetPlayerId][cardIndex];
  const currentPlayerId = getState().turn.currentPlayerTurn;
  const yourId = getState().players.yourId;
  if (currentPlayerId === yourId) return;
  dispatch(checkOpponent(targetPlayerId, cardId));
  dispatch(toggleCardGlow(cardId, true));
};
