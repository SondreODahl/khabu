import {
  PLAYER_JOIN_GAME,
  UPDATE_PLAYERS_INFO,
  UPDATE_SCORES,
} from '../../actions/types';

const scoresReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_SCORES:
      return { ...state, ...payload.scores };
    case UPDATE_PLAYERS_INFO:
      const newState = {};
      for (let id of Object.keys(payload.playerIds)) {
        newState[id] = 0;
      }
      return { ...state, ...newState };
    case PLAYER_JOIN_GAME:
      const playerId = payload.playerId;
      return { ...state, [playerId]: 0 };
    default:
      return state;
  }
};

export default scoresReducer;