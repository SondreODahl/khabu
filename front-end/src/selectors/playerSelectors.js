import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const selectProps = (_, props) => props;
export const selectYourId = (state) => state.players.yourId;
export const selectAllPlayers = (state) => state.players.allPlayers;
export const selectOpponentId = createSelector(
  selectYourId,
  selectAllPlayers,
  (yourId, allPlayers) => allPlayers.filter((ids) => ids !== yourId).pop()
);

export const selectPlayerNameById = createCachedSelector(
  (state, props) => state.players.byId[props.playerId],
  (name) => name
)((state, props) => props.playerId);
