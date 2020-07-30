import { createSelector } from 'reselect';

export const selectYourId = (state) => state.players.yourId;
export const selectAllPlayers = (state) => state.players.allPlayers;
export const selectOpponentId = createSelector(
  selectYourId,
  selectAllPlayers,
  (yourId, allPlayers) => allPlayers.filter((ids) => ids !== yourId).pop()
);
export const selectPlayerName = (state, props) => state.players.byId[props.playerId];
