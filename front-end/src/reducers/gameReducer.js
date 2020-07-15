import { PLAYER_JOIN_GAME } from '../actions/types';

const initialState = {
  begun: false,
  players: { player0: null }, // TODO: Consider moving players to separate reducer
  amountOfPlayers: 1,
  scores: { player0: 0 },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAYER_JOIN_GAME:
      const amountOfPlayers = state.amountOfPlayers++;
      const playerId = `player${amountOfPlayers}`;
      return { ...state, [playerId]: payload, amountOfPlayers };
    // TODO: case: UPDATE_SCORES
  }
};
