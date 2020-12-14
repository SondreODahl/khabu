import {
  ACTIVATE_EFFECT,
  CHECK_CARD,
  CHOOSE_CARD_FOR_EFFECT,
  FINISH_EFFECT,
} from './types';
import { revealCard, toggleCardGlow, updateCard } from './cardActions';
import { FRENZY, PUT } from '../constants/gameStates';

/*
  Actions related to the use of card effects.
  playerChoseCard - Chooses a card to use with an effect. Adds a glow to the card.
  playerExchangedCards - Not implemented
  checkPlayerCard - Private check. Reveals value of a card.
  playerCheckedCard - Public check. Glows the card that was chosen.
  playerFinishedEffect - Either hides a card or stops its glow. Returns to previous gamestate.
*/

// ------------------------- Basic Actions -----------------------------

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
  const nextState = currentPuttingPlayer ? PUT : FRENZY; // Checks whether someone has put 
  return { type: FINISH_EFFECT, payload: {nextState} };
};

// ---------------------------- Main actions ----------------------------

export const playerChoseCard = (victimId, cardIndex) => (dispatch, getState) => {
  const cardId = getState().cards[victimId][cardIndex];
  dispatch(chooseCardForEffect(cardId, victimId));
  dispatch(toggleCardGlow(cardId, true));
};

export const playerExchangedCards = () => (dispatch, getState) => {
  const { cardOne, cardTwo } = getState().effects.chosenCards;
  // TODO: Implement
};

// Private check
export const checkPlayerCard = (victim, victimCard, value) => (
  dispatch,
  getState
) => {
  const cardId = getState().cards[victim][victimCard];
  dispatch(revealCard(victim, victimCard, value));
  dispatch(checkCard(victim, cardId));
};

// Public check
export const playerCheckedCard = (targetPlayerId, cardIndex) => (
  dispatch,
  getState
) => {
  const currentPlayerId = getState().turn.currentPlayerTurn;
  const yourId = getState().players.yourId;
  if (currentPlayerId === yourId) return; // You receive info on private channel if you are the current player
  const target = targetPlayerId === undefined ? currentPlayerId : targetPlayerId; // if undefined, it is a check self. Else it is check other.
  const cardId = getState().cards[target][cardIndex];
  dispatch(checkCard(target, cardId));
  dispatch(toggleCardGlow(cardId, true));
};

export const playerFinishedEffect = (swap) => (dispatch, getState) => {
  const currentPlayerId = getState().turn.currentPlayerTurn;
  const yourId = getState().players.yourId;
  const cardOneId = getState().effect.chosenCards.cardOne.cardId;
  const currentPuttingPlayer = getState().turn.currentPuttingPlayer;
  if (currentPlayerId === yourId) {
    dispatch(updateCard(cardOneId, null)); // Only need to hide if you are current player. Else, you will not know the value regardless. 
  } else {
    dispatch(toggleCardGlow(cardOneId, false)); // Should later on toggle both cards. 
  }
  if (swap) {
    // TODO: Implement
  }
  dispatch(finishEffect(currentPuttingPlayer));
};
