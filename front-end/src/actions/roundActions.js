import {
  ALL_PLAYERS_READY,
  START_ROUND,
  PLAYER_READY,
  UPDATE_PLAYERS_READY,
  HIDE_HAND,
  ROUND_END,
} from './types';

export const initializeRound = (revealTime, startingHandSize) => (
  dispatch,
  getState
) => {
  const playerIds = getState().players.allPlayers;
  dispatch({
    type: ALL_PLAYERS_READY,
    payload: { playerIds, revealTime, startingHandSize },
  });
};

export const startRound = (startingPlayerId) => (dispatch, getState) => {
  const yourId = getState().players.yourId;
  dispatch({ type: HIDE_HAND, payload: { playerId: yourId } });
  dispatch({ type: START_ROUND, payload: { startingPlayerId } });
};

export const roundEnd = (cards) => {
  return { type: ROUND_END, payload: { cards } };
};

export const toggleReady = () => {
  return { type: PLAYER_READY };
};

export const updatePlayersReady = (playersReady) => {
  playersReady = parseInt(playersReady);
  return { type: UPDATE_PLAYERS_READY, payload: playersReady };
};

export const endRound = (playersInfo) => (dispatch, getState) => {
  console.log(playersInfo);
  const cards = {};
  Object.keys(playersInfo).forEach((playerId) => {
    const playerHand = getState().cards[playerId];
    console.log(playerHand);
    for (let i = 0; i < playerHand.length; i++) {
      const cardId = playerHand[i];
      const cardValue = playersInfo[playerId].cards[i];
      cards[cardId] = { value: cardValue, glow: false };
    }
  });
  dispatch(roundEnd(cards));
};
