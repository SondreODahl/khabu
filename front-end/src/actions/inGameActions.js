import { END_TURN, PLAYER_CALLED_KHABU } from './types';

export const playerCalledKhabu = (playerId, nextPlayerId) => {
  return { type: PLAYER_CALLED_KHABU, payload: { playerId, nextPlayerId } };
};

export const playerEndedTurn = (nextPlayerId) => {
  return { type: END_TURN, payload: nextPlayerId };
};
