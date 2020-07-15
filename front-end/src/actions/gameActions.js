import { PLAYER_JOIN_GAME } from './types';

export const playerJoined = (username) => {
  return { type: PLAYER_JOIN_GAME, payload: username };
};
