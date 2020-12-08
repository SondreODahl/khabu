import {
  PLAYER_JOIN_GAME,
  GET_PLAYERS_INFO,
  UPDATE_SCORES,
} from '../../actions/types';

// Keeps track of each player's total score through all rounds accessed by their id. 
const scoresReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_SCORES: // Receives the scores formatted
      return { ...state, ...payload.scores };
    case GET_PLAYERS_INFO: // Necessary for when you join a game that already contains players
      const newState = {};
      for (let id of Object.keys(payload.playerIds)) {
        newState[id] = 0;
      }
      return newState;
    case PLAYER_JOIN_GAME: 
      const playerId = payload.playerId;
      return { ...state, [playerId]: 0 };
    default:
      return state;
  }
};

export default scoresReducer;
