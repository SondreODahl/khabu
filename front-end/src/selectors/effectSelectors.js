import { createSelector } from 'reselect';
import { CHOOSE_CARD_FOR_EFFECT } from '../actions/types';
import {
  CHOOSE_CARD,
  FINISH_USING_EFFECT,
  PLAYER_CHECK_OTHER,
  PLAYER_CHECK_SELF,
} from '../constants/effectMoves';
import { USING_EFFECT } from '../constants/gameStates';
import { getIsYourTurn } from './turnSelectors';

const selectEffectType = (state) => state.effect.effectType;
const selectChosenCards = (state) => state.effect.chosenCards;
const selectCurrentGameState = (state) => state.gameState.currentState;

export const getEffectType = createSelector(selectEffectType, (type) => {
  if (type === null) return type;
  if (type < 9) return PLAYER_CHECK_SELF;
  if (type < 11) return PLAYER_CHECK_OTHER;
  return type < 13 ? CHOOSE_CARD : null; // Replace with CHOOSE_CARD
});

export const getIsUsingEffect = createSelector(
  selectCurrentGameState,
  (state) => state === USING_EFFECT
);

export const getCardEffectAction = createSelector(
  getIsUsingEffect,
  getEffectType,
  selectChosenCards,
  getIsYourTurn,
  (isUsing, type, chosenCards, yourTurn) => {
    if (isUsing && yourTurn && type !== PLAYER_CHECK_OTHER) {
      if (type === PLAYER_CHECK_SELF && chosenCards.cardOne)
        return FINISH_USING_EFFECT;
      return type;
    }
    return null;
  }
);

export const getCardEffectActionOpponent = createSelector(
  getIsUsingEffect,
  getEffectType,
  selectChosenCards,
  getIsYourTurn,
  (isUsing, type, chosenCards, yourTurn) => {
    if (isUsing && yourTurn && type !== PLAYER_CHECK_SELF) {
      if (type === PLAYER_CHECK_OTHER && chosenCards.cardOne)
        return FINISH_USING_EFFECT;
      return type;
    }
    return null;
  }
);
