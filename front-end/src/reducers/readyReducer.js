import { PLAYER_READY, UPDATE_PLAYERS_READY } from '../actions/types';

export default (
  state = { playerReady: false, totalReady: 0 },
  { type, payload }
) => {
  switch (type) {
    case PLAYER_READY:
      const playerReady = !state.playerReady;
      return { ...state, playerReady };
    case UPDATE_PLAYERS_READY:
      return { ...state, totalReady: payload };
    default:
      return state;
  }
};
