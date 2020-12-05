import {
  ALL_PLAYERS_READY,
  HIDE_HAND,
  PLAYER_READY,
  ROUND_END,
  START_ROUND,
  UPDATE_PLAYERS_READY,
} from './types';
import { updateScores } from './scoresActions';

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
  const cards = {};
  const scores = {};
  Object.keys(playersInfo).forEach((playerId) => {
    const playerHand = getState().cards[playerId];
    const prevScore = getState().scores[playerId];
    scores[playerId] = playersInfo[playerId].score + prevScore;
    let backEndIndex = 0;
    for (let i = 0; i < playerHand.length; i++) {
      const cardId = playerHand[i];
      if (cardId === null) continue;
      const cardValue = playersInfo[playerId].cards[backEndIndex];
      backEndIndex++;
      cards[cardId] = { value: cardValue, glow: false };
    }
  });
  dispatch(roundEnd(cards));
  dispatch(updateScores(scores));
};
