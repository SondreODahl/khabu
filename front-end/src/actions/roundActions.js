import { ALL_PLAYERS_READY, START_ROUND } from './types';

export const initializeRound = () => (dispatch, getState) => {
  const playerIds = getState().players.allPlayers;
  dispatch({ type: ALL_PLAYERS_READY, payload: { playerIds } });
};

export const startRound = () => {
  return { type: START_ROUND };
};
