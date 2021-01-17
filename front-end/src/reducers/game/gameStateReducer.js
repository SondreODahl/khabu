import {
  ACTIVATE_EFFECT,
  DISCARD_CARD,
  DRAW_FROM_DECK,
  END_TURN,
  FINISH_EFFECT,
  PLAYER_CALLED_KHABU,
  PLAYER_DISCONNECTED,
  PLAYER_RECONNECTED,
  PUT_CARD,
  PUT_REVERSE,
  ROUND_END,
  START_ROUND,
  SWAP_CARDS,
  SWAP_WITH_DISC,
  TRANSFER_CARD,
} from '../../actions/types';
import {
  CARD_DRAWN,
  DISCARD,
  DRAW,
  FIRST_TURN,
  FRENZY,
  PUT,
  PUT_FAIL,
  TRANSFER,
  USING_EFFECT,
  WAIT_FOR_RECONNECT,
} from '../../constants/gameStates';

// Helper object to remember previous state
const prevStateHolder = {
  currentState: null,
  putAllowed: false,
} 

// Helper method to reduce bloat in main reducer
const newState = (currentState, putAllowed) => {
  return { currentState, putAllowed };
};

const initialState = {
  currentState: null, // Uses gameStates in constants folder
  putAllowed: false,
};

const gameState = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIVATE_EFFECT:
      return newState(USING_EFFECT, false);
    case DISCARD_CARD:
      return newState(DISCARD, true);
    case DRAW_FROM_DECK:
      return newState(CARD_DRAWN, false);
    case END_TURN:
    case PLAYER_CALLED_KHABU:
      return newState(DRAW, false);
    case FINISH_EFFECT:
    case PUT_REVERSE:
      return newState(payload.nextState, true); // Put is always allowed if a failed put has been allowed to happened
    case PLAYER_DISCONNECTED:
      prevStateHolder.currentState = state.currentState;
      prevStateHolder.putAllowed = state.putAllowed;
      return newState(WAIT_FOR_RECONNECT, false);
    case PLAYER_RECONNECTED:
      const { currentState, putAllowed } = prevStateHolder;
      return newState(currentState, putAllowed);
    case PUT_CARD:
      if (payload.status === 'fail') return newState(PUT_FAIL, false);
      if (payload.agent === payload.victim) return newState(PUT, true); // A put-self case. Cannot transfer to yourself.
      return newState(TRANSFER, false); // Transfer to another player
    case ROUND_END:
      return initialState;
    case START_ROUND:
      return newState(FIRST_TURN, false);
    case SWAP_CARDS:
    case SWAP_WITH_DISC:
      return newState(FRENZY, true);
    case TRANSFER_CARD:
      return newState(PUT, true);
    default:
      return state;
  }
};

export default gameState;
