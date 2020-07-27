import {
  ALL_PLAYERS_READY,
  START_ROUND,
  PLAYER_READY,
  UPDATE_PLAYERS_READY,
  HIDE_HAND,
} from './types';

export const initializeRound = (revealTime, startingHandSize) => (
  dispatch,
  getState
) => {
  const playerIds = getState().players.allPlayers;
  dispatch({
    type: ALL_PLAYERS_READY,
    payload: { playerIds, revealTime, startingHandSize },
  });
};

export const startRound = (startingPlayerId) => (dispatch, getState) => {
  const yourId = getState().players.yourId;
  dispatch({ type: HIDE_HAND, payload: { playerId: yourId } });
  dispatch({ type: START_ROUND, payload: { startingPlayerId } });
};

export const toggleReady = () => {
  return { type: PLAYER_READY };
};

export const updatePlayersReady = (playersReady) => {
  playersReady = parseInt(playersReady);
  return { type: UPDATE_PLAYERS_READY, payload: playersReady };
};
