import { PLAYER_JOIN_GAME, UPDATE_PLAYERS_INFO } from './types';

export const retrievePlayers = (response) => {
  const yourId = response.yourId;
  const playerIds = response.playerIds;
  return {
    type: UPDATE_PLAYERS_INFO,
    payload: { yourId, playerIds },
  };
};

export const playerJoinedGame = (topic, json) => {
  const parsedJSON = JSON.parse(json);
  console.log(parsedJSON);
  const playerId = parsedJSON.playerId;
  const playerName = parsedJSON.playerName;
  return { type: PLAYER_JOIN_GAME, payload: { playerId, playerName } };
};
