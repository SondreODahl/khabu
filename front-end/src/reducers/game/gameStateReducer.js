import {
  DISCARD_CARD,
  DRAW_FROM_DECK,
  END_TURN,
  PLAYER_CALLED_KHABU,
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
  TRANSFER,
} from './gameStates';

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
    case SUCCESSFUL_PUT_SELF:
    case TRANSFER_CARD:
      return newState(PUT, payload.putAllowed);
    case SUCCESSFUL_PUT_OTHER:
      return newState(TRANSFER, false);
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
