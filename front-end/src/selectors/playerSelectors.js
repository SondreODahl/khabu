import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const selectProps = (_, props) => props; // Lets you use props with your selector. Must pass in props as argument in useSelector.
export const selectYourId = (state) => state.players.yourId;
export const selectAllPlayers = (state) => state.players.allPlayers;
export const selectOpponentId = createSelector(
  selectYourId,
  selectAllPlayers,
  (yourId, allPlayers) => allPlayers.filter((ids) => ids !== yourId).pop() // Temporary solution. Will not work with multiple opponents
);

// Receives a prop with the playerId and determines their name. Uses id as cache key
export const selectPlayerNameById = createCachedSelector(
  (state, props) => state.players.byId[props.playerId],
  (name) => name
)((state, props) => props.playerId);
