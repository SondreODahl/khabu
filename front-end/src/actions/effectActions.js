import {
  ACTIVATE_EFFECT,
  CHECK_CARD,
  CHOOSE_CARD_FOR_EFFECT,
  FINISH_EFFECT,
} from './types';
import { revealCard, toggleCardGlow, updateCard } from './cardActions';
import { FRENZY, PUT } from '../constants/gameStates';

export const activateEffect = () => {
  return { type: ACTIVATE_EFFECT };
};

export const chooseCardForEffect = (cardId, victimId) => {
  return { type: CHOOSE_CARD_FOR_EFFECT, payload: { cardId, victimId } };
};

export const checkCard = (victimId, cardId) => {
  return { type: CHECK_CARD, payload: { victimId, cardId } };
};

export const finishEffect = (currentPuttingPlayer) => {
  const payload = {};
  payload.nextState = currentPuttingPlayer ? PUT : FRENZY;
  return { type: FINISH_EFFECT, payload };
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
  dispatch(checkCard(victim, cardId));
};

export const playerCheckedOpponent = (targetPlayerId, cardIndex) => (
  dispatch,
  getState
) => {
  const cardId = getState().cards[targetPlayerId][cardIndex];
  const currentPlayerId = getState().turn.currentPlayerTurn;
  const yourId = getState().players.yourId;
  if (currentPlayerId === yourId) return;
  dispatch(checkCard(targetPlayerId, cardId));
  dispatch(toggleCardGlow(cardId, true));
};

export const playerFinishedEffect = (swap) => (dispatch, getState) => {
  const currentPlayerId = getState().turn.currentPlayerTurn;
  const yourId = getState().players.yourId;
  const cardOneId = getState().effect.chosenCards.cardOne.cardId;
  const currentPuttingPlayer = getState().turn.currentPuttingPlayer;
  if (currentPlayerId === yourId) {
    dispatch(updateCard(cardOneId, null));
  } else {
    dispatch(toggleCardGlow(cardOneId, false));
  }
  if (swap) {
    // TODO: Implement
  }
  dispatch(finishEffect(currentPuttingPlayer));
};
