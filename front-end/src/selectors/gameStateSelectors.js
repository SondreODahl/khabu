import { CARD_DRAWN, DRAW, FIRST_TURN, TRANSFER } from '../constants/gameStates';
import {
  getAreYouCurrentPuttingPlayer,
  getIsYourTurn,
  selectCurrentPuttingPlayer,
} from './turnSelectors';
import { createSelector } from 'reselect';
import {
  DISCARD_MOVE,
  DRAW_MOVE,
  PUT_MOVE,
  REVEAL_MOVE,
  SWAP_MOVE,
  TRANSFER_MOVE,
} from '../constants/gameMoves';
import { selectDiscardPileLength } from './cardSelectors';
import { selectYourId } from './playerSelectors';

export const selectCurrentGameState = (state) => state.gameState.currentState;
const selectPutAllowed = (state) => state.gameState.putAllowed;
export const getCanPut = createSelector(
  selectPutAllowed,
  selectCurrentPuttingPlayer,
  selectYourId,
  (putAllowed, currentPuttingPlayer, yourId) =>
    putAllowed && (currentPuttingPlayer === null || currentPuttingPlayer === yourId)
);

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
  getIsYourTurn,
  (length, state, yourTurn) => {
    if (yourTurn && state !== null) {
      if (length === 0) return DISCARD_MOVE;
      else if (state === DRAW) return DRAW_MOVE;
    }
    return null;
  }
);

export const getCardAction = createSelector(
  selectCurrentGameState,
  getCanPut,
  getAreYouCurrentPuttingPlayer,
  getIsYourTurn,
  (state, canPut, puttingPlayer, yourTurn) => {
    if (canPut) return PUT_MOVE;
    if (state === CARD_DRAWN && yourTurn) return SWAP_MOVE;
    if (state === TRANSFER && puttingPlayer) return TRANSFER_MOVE;
    if (state === null) return REVEAL_MOVE; // Before the game has started. State is null
    return null; // No valid moves at this moment
  }
);