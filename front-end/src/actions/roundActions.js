import {
  ALL_PLAYERS_READY,
  HIDE_HAND,
  PLAYER_READY,
  ROUND_END,
  START_ROUND,
  UPDATE_PLAYERS_READY,
} from './types';
import { updateScores } from './scoresActions';

/*
  Actions used to change the round or ready state.
  toggleReady - Toggles whether you have readied up
  updatePlayersReady - Updates total amount of ready players
  initializeRound - Starts reveal period. 
  startRound - After reveal period. Begins turn-based play.
  endRound - After a full round. Reveals cards and adds scores to sum. 
*/

// ----------------------- Basic Actions --------------------------

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

// --------------------------- Thunks -------------------------------

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

// Receives each player's hand and their score this round.
// Adds the sum to their overall score and reveals their cards.
export const endRound = (playersInfo) => (dispatch, getState) => {
  const cards = {}; // Object for use with roundEnd
  const scores = {}; // Object for use with updateScores
  Object.keys(playersInfo).forEach((playerId) => {
    const playerHand = getState().cards[playerId]; // Array of cardIds
    const prevScore = getState().scores[playerId];
    const scoreThisRound = playersInfo[playerId].score;
    scores[playerId] = scoreThisRound + prevScore;
    // Used to iterate over backend cards while skipping empty slots.
    // Backend will not keep track of nulled cards (i.e. put cards), only those that remain
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
