import { BEGIN_GAME, PLAYER_JOIN_GAME, GET_PLAYERS_INFO } from './types';

// Called upon joining the game. Stores info about playerIds
export const retrievePlayers = (response) => {
  const yourId = response.yourId;
  const playerIds = response.playerIds;
  return {
    type: GET_PLAYERS_INFO,
    payload: { yourId, playerIds },
  };
};

// For players that join after you. Function is a thunk because it needs state from another part of store.
export const playerJoinedGame = (topic, json) => (dispatch, getState) => {
  const parsedJSON = JSON.parse(json);
  const { playerId, playerName } = parsedJSON;
  const capacityReached = parsedJSON.capacityReached === 'true'; // BACKEND SENDS STRING VALUES
  dispatch({
    type: PLAYER_JOIN_GAME, // Action each time a player joins. Broadcast by them.
    payload: { playerId, playerName },
  });
  if (capacityReached) {
    const capacity = getState().players.allPlayers.length;
    dispatch({ type: BEGIN_GAME, payload: capacity });
  }
};
