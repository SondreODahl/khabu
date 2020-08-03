import { selectCurrentGameState } from './gameStateSelectors';
import { DISCARD, USING_EFFECT } from '../constants/gameStates';
import { createSelector } from 'reselect';
import {
  CHECK_TWO_CARDS,
  EXCHANGE_CARDS,
  PLAYER_CHECK_OTHER,
  PLAYER_CHECK_SELF,
} from '../constants/effectMoves';

const selectEffectType = (state) => state.effect.effectType;
const selectChosenCards = (state) => state.effect.chosenCards;

export const getEffectType = createSelector(selectEffectType, (type) => {
  if (type === null) return type;
  if (type < 9) return PLAYER_CHECK_SELF;
  if (type < 11) return PLAYER_CHECK_OTHER;
  if (type < 13) return EXCHANGE_CARDS;
  return type === 13 ? CHECK_TWO_CARDS : null;
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
  (isUsing, type) => {
    if (isUsing && type !== PLAYER_CHECK_SELF) return type;
    return null;
  }
);
