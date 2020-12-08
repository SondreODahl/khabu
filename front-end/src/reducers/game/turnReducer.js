import { combineReducers } from 'redux';
import {
  END_TURN,
  PLAYER_CALLED_KHABU,
  PUT_CARD,
  ROUND_END,
  START_ROUND,
} from '../../actions/types';

/* Turn state. Keeps track of whose turn it is, and who is the putting/khabu player in that turn. */

// The playerId who put during this turn. Will only update on first successful put and then the end of turn.
const currentPuttingPlayer = (state = null, { type, payload }) => {
  switch (type) {
    case PUT_CARD:
      if (payload.status === 'success') return payload.agent;
      return state;
    case END_TURN:
    case PLAYER_CALLED_KHABU:
    case ROUND_END:
      return null;
    default:
      return state;
  }
};

// The playerId who called khabu this round. Will only update on first khabu-call or round end.
const khabuPlayer = (state = null, { type, payload }) => {
  switch (type) {
    case PLAYER_CALLED_KHABU:
      return payload.playerId;
    case ROUND_END:
      return null;
    default:
      return state;
  }
};

// The playerId who is the current player.
const currentPlayerTurn = (state = null, { type, payload }) => {
  switch (type) {
    case START_ROUND:
      return payload.startingPlayerId;
    case PLAYER_CALLED_KHABU:
    case END_TURN:
      return payload.nextPlayerId;
    case ROUND_END:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  currentPuttingPlayer,
  khabuPlayer,
  currentPlayerTurn,
});
