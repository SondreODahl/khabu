import {
  ACTIVATE_EFFECT,
  DISCARD_CARD,
  DRAW_FROM_DECK,
  END_TURN,
  FINISH_EFFECT,
  PLAYER_CALLED_KHABU,
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
} from '../../constants/gameStates';

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
    case START_ROUND:
      return newState(FIRST_TURN, false);
    case PLAYER_CALLED_KHABU:
    case END_TURN:
      return newState(DRAW, false);
    case DRAW_FROM_DECK:
      return newState(CARD_DRAWN, false);
    case PUT_CARD:
      if (payload.status === 'fail') return newState(PUT_FAIL, false);
      if (payload.agent === payload.victim) return newState(PUT, true); // A put-self case. Cannot transfer to yourself.
      return newState(TRANSFER, false); // Transfer to another player
    case PUT_REVERSE:
    case FINISH_EFFECT:
      return newState(payload.nextState, true); // Put is always allowed if a failed put has been allowed to happened
    case TRANSFER_CARD:
      return newState(PUT, true);
    case SWAP_CARDS:
    case SWAP_WITH_DISC:
      return newState(FRENZY, true);
    case DISCARD_CARD:
      return newState(DISCARD, true);
    case ACTIVATE_EFFECT:
      return newState(USING_EFFECT, false);
    case ROUND_END:
      return initialState;
    default:
      return state;
  }
};

export default gameState;
