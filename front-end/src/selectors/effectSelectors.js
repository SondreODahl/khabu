import { DISCARD, USING_EFFECT } from '../constants/gameStates';
import { createSelector } from 'reselect';
import {
  CHECK_TWO_CARDS,
  CHOOSE_CARD,
  EXCHANGE_CARDS,
  FINISH_USING_EFFECT,
  PLAYER_CHECK_OTHER,
  PLAYER_CHECK_SELF,
} from '../constants/effectMoves';
import { getAreYouCurrentPuttingPlayer } from './turnSelectors';

const selectEffectType = (state) => state.effect.effectType;
const selectChosenCards = (state) => state.effect.chosenCards;
const selectCurrentGameState = (state) => state.gameState.currentState;

export const getEffectType = createSelector(selectEffectType, (type) => {
  if (type === null) return type;
  if (type < 9) return PLAYER_CHECK_SELF;
  if (type < 11) return PLAYER_CHECK_OTHER;
  return type <= 13 ? null : null; // Replace with CHOOSE_CARD
});

export const getIsUsingEffect = createSelector(
  selectCurrentGameState,
  (state) => state === USING_EFFECT
);

export const getCardEffectAction = createSelector(
  getIsUsingEffect,
  getEffectType,
  (isUsing, type) => {
    if (isUsing && type !== PLAYER_CHECK_OTHER) return type;
    return null;
  }
);

export const getCardEffectActionOpponent = createSelector(
  getIsUsingEffect,
  getEffectType,
  selectChosenCards,
  (isUsing, type, chosenCards) => {
    if (isUsing && type !== PLAYER_CHECK_SELF) {
      if (type === PLAYER_CHECK_OTHER && chosenCards.cardOne)
        return FINISH_USING_EFFECT;
      return type;
    }
    return null;
  }
);
