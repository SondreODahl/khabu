import { DRAW, FIRST_TURN } from '../reducers/game/gameStates';
import { getIsYourTurn } from './turnSelectors';
import { createSelector } from 'reselect';

const selectCurrentGameState = (state) => state.gameState.currentState;

export const getCanDrawCard = createSelector(
  selectCurrentGameState,
  getIsYourTurn,
  (gameState, yourTurn) => {
    if (gameState === FIRST_TURN || gameState === DRAW) return yourTurn;
    else return false;
  }
);
