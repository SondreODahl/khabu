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
import {
  selectYourId,
  selectOpponentId,
} from './playerSelectors';
import {
  getCardEffectAction,
  getCardEffectActionOpponent,
  getEffectType,
} from './effectSelectors';
import { ACTIVATE_EFFECT } from '../constants/effectMoves';

/*
  Internal selectors:
  getCanYouPut - Used to determine whether you are allowed to put in current state. 
  getCanYouDrawCard - Currently unusued?

  External selectors:
  getDiscardPileAction - Used by DiscPile to determine what clicking on it does
  getCardAction - Used by CardWrapper to determine the action of each player card.
  getCardActionOpponent - Used by CardWrapper to determine the action of each opponent card.
  getCanEndTurn - Used by end turn button. Will enable/disable ending the current turn.
  getCanCallKhabu - Used by khabu button. Will enable/disable calling khabu.
*/

const selectProps = (_, props) => props;
export const selectCurrentGameState = (state) => state.gameState.currentState;
const selectPutAllowed = (state) => state.gameState.putAllowed;
const getCanYouPut = createSelector(
  selectCurrentPuttingPlayer,
  selectPutAllowed,
  selectKhabuPlayer,
  selectYourId,
  (currentPuttingPlayer, putAllowed, khabuPlayer, yourId) =>
    putAllowed && (currentPuttingPlayer === null && yourId !== khabuPlayer || currentPuttingPlayer === yourId)
);

export const getCanYouDrawCard = createSelector(
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

// TODO: Should this be moved to cardHand and not cardWrapper? Cached selector?
export const getCardAction = createSelector(
  selectCurrentGameState,
  getCanYouPut,
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

// TODO: Should this be moved to cardHand and not cardWrapper? Cached selector?
export const getCardActionOpponent = createSelector(
  getCanYouPut,
  getCardEffectActionOpponent,
  selectKhabuPlayer,
  selectOpponentId,
  (canPut, effect, khabuPlayer, opponent) =>
    // Effect is null if no effect is possible or if opponent is khabuplayer
    khabuPlayer !== opponent ? (canPut ? PUT_MOVE : effect) : null
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
