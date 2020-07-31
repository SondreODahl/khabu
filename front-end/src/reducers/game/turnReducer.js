import { combineReducers } from 'redux';
import {
  END_TURN,
  PLAYER_CALLED_KHABU,
  PUT_CARD,
  ROUND_END,
  START_ROUND,
} from '../../actions/types';

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

const khabuPlayer = (state = null, { type, payload }) => {
  switch (type) {
    case PLAYER_CALLED_KHABU:
      return payload.playerId;
    default:
      return state;
  }
};

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
  currentPlayerTurn,
  currentPuttingPlayer,
  khabuPlayer,
});
