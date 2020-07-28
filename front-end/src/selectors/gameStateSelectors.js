import { DRAW, FIRST_TURN } from '../constants/gameStates';
import { getIsYourTurn } from './turnSelectors';
import { createSelector } from 'reselect';
import { DISCARD_MOVE, DRAW_MOVE, PUT_MOVE } from '../constants/gameMoves';
import { selectDiscardPileLength } from './cardSelectors';

export const selectCurrentGameState = (state) => state.gameState.currentState;
const selectPutAllowed = (state) => state.gameState.putAllowed;

export const getCanDrawCard = createSelector(
  selectCurrentGameState,
  getIsYourTurn,
  (gameState, yourTurn) => {
    if (gameState === FIRST_TURN || gameState === DRAW) return yourTurn;
    else return false;
  }
);
export const getDiscardPileAction = createSelector(
  selectDiscardPileLength,
  selectCurrentGameState,
  selectPutAllowed,
  getIsYourTurn,
  (length, state, putAllowed, yourTurn) => {
    if (state !== null) {
      if (putAllowed) return PUT_MOVE; // Put is only allowed when the others aren't
      if (yourTurn) {
        if (length === 0) return DISCARD_MOVE;
        else if (state === DRAW) return DRAW_MOVE;
      }
    }
    return null;
  }
);
