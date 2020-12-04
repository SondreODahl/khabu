import { BEGIN_GAME, PLAYER_JOIN_GAME, UPDATE_PLAYERS_INFO } from './types';

export const retrievePlayers = (response) => {
  const yourId = response.yourId;
  const playerIds = response.playerIds;
  return {
    type: UPDATE_PLAYERS_INFO,
    payload: { yourId, playerIds },
  };
};

export const playerJoinedGame = (topic, json) => (dispatch, getState) => {
  const parsedJSON = JSON.parse(json);
  console.log(parsedJSON);
  const playerId = parsedJSON.playerId;
  const playerName = parsedJSON.playerName;
  const capacityReached = parsedJSON.capacityReached === 'true'; // BACKEND SENDS STRING VALUES
  if (capacityReached) {
    const capacity = getState().players.allPlayers.length;
    dispatch({
      type: PLAYER_JOIN_GAME,
      payload: { playerId, playerName },
    });
    dispatch({ type: BEGIN_GAME, payload: capacity });
  } else dispatch({ type: PLAYER_JOIN_GAME, payload: { playerId, playerName } });
};
