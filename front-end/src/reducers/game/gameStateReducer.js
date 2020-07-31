import {
  DISCARD_CARD,
  DRAW_FROM_DECK,
  END_TURN,
  PLAYER_CALLED_KHABU,
  PUT_CARD,
  PUT_REVERSE,
  ROUND_END,
  START_ROUND,
  SUCCESSFUL_PUT_OTHER,
  SUCCESSFUL_PUT_SELF,
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
} from '../../constants/gameStates';

const initialState = {
  currentState: null,
  putAllowed: false,
};

const newState = (currentState, putAllowed) => {
  return { currentState, putAllowed };
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
      if (payload.status === 'fail')
        // You should move into put_fail stat e
        return newState(PUT_FAIL, false);
      if (payload.agent === payload.victim)
        // This means that it is a put-self case
        return newState(PUT, payload.putAllowed); // Cannot transfer to yourself
      return newState(TRANSFER, false); // Transfer to another player
    case PUT_REVERSE:
      return newState(payload.prevState, true); // Put is always allowed if a failed put has been allowed to happened
    case TRANSFER_CARD:
      return newState(PUT, payload.putAllowed);
    case SWAP_CARDS:
    case SWAP_WITH_DISC:
      return newState(FRENZY, true);
    case DISCARD_CARD:
      return newState(DISCARD, true);
    case ROUND_END:
      return initialState;
    default:
      return state;
  }
};

export default gameState;
