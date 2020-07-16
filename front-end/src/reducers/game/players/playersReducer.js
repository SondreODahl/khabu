import { PLAYER_JOIN_GAME } from '../../../actions/types';

const initialState = {
  begun: false,
  players: { player0: null },
  amountOfPlayers: 1,
  playerCapacity: 2, // TODO: Make customizable later
  scores: { player0: 0 },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAYER_JOIN_GAME:
      const amountOfPlayers = state.amountOfPlayers++;
      const playerId = `player${amountOfPlayers}`;
      return { ...state, [playerId]: payload, amountOfPlayers };
    default:
      return state;
    // TODO: case: UPDATE_SCORES
  }
};
