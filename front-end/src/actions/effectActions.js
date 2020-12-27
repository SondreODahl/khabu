import {
  ACTIVATE_EFFECT,
  CHECK_CARD,
  CHOOSE_CARD_EFFECT,
  EXCHANGE_CARDS,
  FINISH_EFFECT,
} from './types';
import { revealCard, swapCards, toggleCardGlow, updateCard } from './cardActions';
import { FRENZY, PUT } from '../constants/gameStates';

/*
  Actions related to the use of card effects.
  playerChoseCard - Chooses a card to use with an effect. Adds a glow to the card.
  playerExchangedCards - Swaps the two cards that were previously chosen by playerChoseCard.
  checkPlayerCard - Private check. Reveals value of a card.
  playerCheckedCard - Public check. Glows the card that was chosen.
  playerFinishedEffect - Either hides a card or stops its glow. Returns to previous gamestate.
*/

// ------------------------- Basic Actions -----------------------------

export const activateEffect = () => {
  return { type: ACTIVATE_EFFECT };
};

export const chooseCardForEffect = (cardId, victimId) => {
  return { type: CHOOSE_CARD_EFFECT, payload: { cardId, victimId } };
};

export const checkCard = (victimId, cardId) => {
  return { type: CHECK_CARD, payload: { victimId, cardId } };
};

const exchangeCards = (cardOne, cardTwo) => {
  return { type: EXCHANGE_CARDS, payload: { cardOne, cardTwo } };
};

export const finishEffect = (currentPuttingPlayer) => {
  const nextState = currentPuttingPlayer ? PUT : FRENZY; // Checks whether someone has put
  return { type: FINISH_EFFECT, payload: { nextState } };
};

// ---------------------------- Main actions ----------------------------

export const playerChoseCard = (victimId, cardIndex) => (dispatch, getState) => {
  const cardId = getState().cards[victimId][cardIndex];
  dispatch(chooseCardForEffect(cardId, victimId));
  dispatch(toggleCardGlow(cardId, true));
};

export const playerExchangedCards = () => (dispatch, getState) => {
  const { cardOne, cardTwo } = getState().effect.chosenCards;
  dispatch(exchangeCards(cardOne, cardTwo));
  setTimeout(() => {
    dispatch(toggleCardGlow(cardOne.cardId, false));
    dispatch(toggleCardGlow(cardTwo.cardId, false));
  }, 1000); // Automatically untoggles
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

export const revealChosenCards = (victimOneValue, victimTwoValue) => (
  dispatch,
  getState
) => {
  const victimOneId = getState().effect.chosenCards.cardOne.cardId;
  const victimTwoId = getState().effect.chosenCards.cardTwo.cardId;
  dispatch(updateCard(victimOneId, victimOneValue));
  dispatch(updateCard(victimTwoId, victimTwoValue));
};

const undoSingleCardReveal = () => {
  const currentPlayerId = getState().turn.currentPlayerTurn;
  const yourId = getState().players.yourId;
  const cardOneId = getState().effect.chosenCards.cardOne.cardId;
  if (currentPlayerId === yourId) {
    // Only need to hide if you are current player. Else, you will not know the value regardless.
    dispatch(updateCard(cardOneId, null));
  } else {
    dispatch(toggleCardGlow(cardOneId, false));
  }
};

export const playerFinishedEffect = (swap) => (dispatch, getState) => {
  const currentEffect = getState().effect.effectType;
  if (7 <= currentEffect <= 10) dispatch(undoSingleCardReveal()); // TODO: Change magic numbers
  else if (swap) dispatch(playerExchangedCards());
  const currentPuttingPlayer = getState().turn.currentPuttingPlayer;
  dispatch(finishEffect(currentPuttingPlayer));
};
