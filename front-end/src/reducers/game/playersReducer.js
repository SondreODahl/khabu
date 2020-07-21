import {
  FORM_SUBMIT,
  FORM_VALID,
  PLAYER_JOIN_GAME,
  UPDATE_PLAYERS_INFO,
} from '../../actions/types';
import { combineReducers } from 'redux';

const playerById = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_PLAYERS_INFO:
      return { ...state, ...payload.playerIds };
    case PLAYER_JOIN_GAME:
      const playerId = Object.keys(payload).pop();
      return { ...state, [playerId]: payload[playerId] };
    default:
      return state;
  }
};

const allPlayers = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_PLAYERS_INFO:
      const listOfIds = Object.keys(payload.playerIds);
      return state.concat(listOfIds);
    case PLAYER_JOIN_GAME:
      const playerId = Object.keys(payload).pop();
      return [...state, playerId];
    default:
      return state;
  }
};

const playerCapacity = (state = 2, action) => {
  return state; // TODO: Add playerCapacity as argument to received players info
};

const yourId = (state = null, { type, payload }) => {
  if (type === UPDATE_PLAYERS_INFO) return payload.yourId;
  else return state;
};

export default combineReducers({
  playerById,
  allPlayers,
  yourId,
  playerCapacity,
});
