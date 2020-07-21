import { combineReducers } from 'redux';
import {
  END_TURN,
  PLAYER_CALLED_KHABU,
  ROUND_END,
  START_ROUND,
} from '../../actions/types';

const khabuPlayer = (state = null, { type, payload }) => {
  switch (type) {
    case PLAYER_CALLED_KHABU:
      return payload.playerId;
    default:
      return state;
  }
};

const currentPlayersTurn = (state = null, { type, payload }) => {
  switch (type) {
    case START_ROUND:
    case PLAYER_CALLED_KHABU:
    case END_TURN:
      return payload;
    case ROUND_END:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  currentPlayersTurn,
  khabuPlayer,
});
