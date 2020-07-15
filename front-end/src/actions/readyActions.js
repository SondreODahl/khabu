import { PLAYER_READY, UPDATE_PLAYERS_READY } from './types';

export const toggleReady = () => {
  return { type: PLAYER_READY };
};

export const updatePlayersReady = (topic, playersReady) => {
  playersReady = parseInt(playersReady);
  return { type: UPDATE_PLAYERS_READY, payload: playersReady };
};
