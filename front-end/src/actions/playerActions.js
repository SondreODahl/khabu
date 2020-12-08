import { BEGIN_GAME, PLAYER_JOIN_GAME, GET_PLAYERS_INFO } from './types';

export const retrievePlayers = (response) => {
  const yourId = response.yourId;
  const playerIds = response.playerIds;
  return {
    type: GET_PLAYERS_INFO,
    payload: { yourId, playerIds },
  };
};

export const playerJoinedGame = (topic, json) => (dispatch, getState) => {
  const parsedJSON = JSON.parse(json);
  const { playerId, playerName } = parsedJSON;
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
