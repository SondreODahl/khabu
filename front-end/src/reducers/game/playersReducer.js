import { combineReducers } from 'redux';
import {
  BEGIN_GAME,
  PLAYER_JOIN_GAME,
  GET_PLAYERS_INFO,
  PLAYER_DISCONNECTED,
  PLAYER_RECONNECTED,
} from '../../actions/types';

/* 
  State of all players in a game lobby. Ids are currently stored as strings. TODO: Make ints.
  byId - Each player accessed by their Id. Contains their names.
  allPlayers - Array of all playerIds.
  playerCapacity - How many players can be in one game. Currently 2.
  yourId - Your playerId. 
*/

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_PLAYERS_INFO:
      return payload.playerIds; // Contains Id - Username pairs
    case PLAYER_JOIN_GAME:
      const playerId = payload.playerId;
      return { ...state, [playerId]: payload.playerName };
    default:
      return state;
  }
};

const allPlayers = (state = [], { type, payload }) => {
  switch (type) {
    case GET_PLAYERS_INFO:
      const listOfIds = Object.keys(payload.playerIds);
      return listOfIds;
    case PLAYER_JOIN_GAME:
      const playerId = payload.playerId;
      if (state.includes(playerId)) return state; // In case it was you who broadcast message
      return [...state, playerId]; // Else, received from another player. Add to list
    default:
      return state;
  }
};

const disconnectedPlayers = (state = [], {type, payload}) => {
  switch (type) {
    case PLAYER_DISCONNECTED:
      return [...state, payload.playerId];
    case PLAYER_RECONNECTED:
      return state.filter(playerId => playerId !== payload.playerId); // Remove playerId from disconnected players
    default: return state;
  }
}

const playerCapacity = (state = null, { type, payload }) => {
  if (type === BEGIN_GAME) return payload;
  return state;
};

const yourId = (state = null, { type, payload }) => {
  if (type === GET_PLAYERS_INFO) return payload.yourId;
  else return state;
};

export default combineReducers({
  byId,
  allPlayers,
  disconnectedPlayers,
  playerCapacity,
  yourId,
});
