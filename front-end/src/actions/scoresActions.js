import { UPDATE_SCORES } from './types';

export const updateScores = (scores) => {
  return { type: UPDATE_SCORES, payload: { scores } };
};
