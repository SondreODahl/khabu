import { END_TURN } from './types';

export const endTurn = (nextPlayerId) => {
  return { type: END_TURN, payload: { nextPlayerId } };
};
