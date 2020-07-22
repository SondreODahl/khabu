import { PLAYER_JOIN_GAME, UPDATE_PLAYERS_INFO } from './types';

export const retrievePlayers = (response) => {
  const yourId = response.yourId;
  const playerIds = response.playerIds;
  return {
    type: UPDATE_PLAYERS_INFO,
    payload: { yourId, playerIds },
  };
};

export const playerJoinedGame = (topic, { playerId, username }) => {
  return { type: PLAYER_JOIN_GAME, payload: { [playerId]: username } };
};
