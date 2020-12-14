import { createSelector } from 'reselect';

/* All selectors related to the round reducer */
export const selectRoundState = (state) => state.round.currentState;
const selectPlayerReady = (state) => state.round.ready.playerReady;
const selectTotalReady = (state) => state.round.ready.totalReady;
export const selectReady = createSelector(
  selectPlayerReady,
  selectTotalReady,
  (playerReady, totalReady) => ({ playerReady, totalReady })
);
