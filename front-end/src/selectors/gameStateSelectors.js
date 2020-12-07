import {
  CARD_DRAWN,
  DISCARD,
  DRAW,
  FIRST_TURN,
  FRENZY,
  PUT,
  TRANSFER,
  USING_EFFECT,
} from '../constants/gameStates';
import {
  getAreYouCurrentPuttingPlayer,
  getIsYourTurn,
  selectCurrentPuttingPlayer,
  selectKhabuPlayer,
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
import {
  getCardEffectAction,
  getCardEffectActionOpponent,
  getEffectType,
} from './effectSelectors';
import { ACTIVATE_EFFECT } from '../constants/effectMoves';

const selectProps = (_, props) => props;
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
  getEffectType,
  (length, state, yourTurn, effectType) => {
    if (yourTurn && state !== null) {
      if (state === CARD_DRAWN) return DISCARD_MOVE;
      else if (length !== 0 && state === DRAW) return DRAW_MOVE;
      else if (effectType !== null && state !== USING_EFFECT && state !== TRANSFER)
        return ACTIVATE_EFFECT;
    }
    return null;
  }
);

export const getCardAction = createSelector(
  selectCurrentGameState,
  getCanPut,
  getAreYouCurrentPuttingPlayer,
  getIsYourTurn,
  getCardEffectAction,
  (state, canPut, puttingPlayer, yourTurn, effect) => {
    if (canPut) return PUT_MOVE;
    if (effect) return effect;
    if (state === CARD_DRAWN && yourTurn) return SWAP_MOVE;
    if (state === TRANSFER && puttingPlayer) return TRANSFER_MOVE;
    if (state === null) return REVEAL_MOVE; // Before the game has started. State is null
    return null; // No valid moves at this moment
  }
);

export const getCardActionOpponent = createSelector(
  getCanPut,
  getCardEffectActionOpponent,
  (canPut, effect) => (canPut ? PUT_MOVE : effect) // Effect is null if no effect is possible
);

export const getCanEndTurn = createSelector(
  getIsYourTurn,
  selectCurrentGameState,
  (yourTurn, state) => {
    if (!yourTurn) return false;
    return state === FRENZY || state === PUT || state === DISCARD;
  }
);

export const getCanCallKhabu = createSelector(
  getIsYourTurn,
  selectKhabuPlayer,
  selectCurrentGameState,
  (yourTurn, khabuPlayer, state) =>
    yourTurn && !khabuPlayer && (state === DRAW || state === FIRST_TURN)
);
