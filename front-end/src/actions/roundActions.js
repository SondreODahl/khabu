import { ALL_PLAYERS_READY, START_ROUND } from './types';

export const initializeRound = () => {
  return { type: ALL_PLAYERS_READY };
};

export const startRound = () => {
  return { type: START_ROUND };
};
