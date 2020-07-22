import {
  ALL_PLAYERS_READY,
  START_ROUND,
  PLAYER_READY,
  UPDATE_PLAYERS_READY,
} from './types';

export const initializeRound = (revealTime) => (dispatch, getState) => {
  const playerIds = getState().players.allPlayers;
  dispatch({ type: ALL_PLAYERS_READY, payload: { playerIds, revealTime } });
};

export const startRound = (startingPlayerId) => {
  return { type: START_ROUND, payload: startingPlayerId };
};

export const toggleReady = () => {
  return { type: PLAYER_READY };
};

export const updatePlayersReady = (playersReady) => {
  playersReady = parseInt(playersReady);
  return { type: UPDATE_PLAYERS_READY, payload: playersReady };
};

export const startRound = (startingPlayer) => {
  return { type: START_ROUND, payload: startingPlayer };
};
