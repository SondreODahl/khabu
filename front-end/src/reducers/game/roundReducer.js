import {
  ALL_PLAYERS_READY,
  BEGIN_GAME,
  PLAYER_READY,
  ROUND_END,
  SHOW_CARD,
  START_ROUND,
  UPDATE_PLAYERS_READY,
} from '../../actions/types';
import { combineReducers } from 'redux';

/*
  All state related to the current round. 
  roundState (obj) - Constants for each possible state.
  currentState - The current state of the round. 
  playerRevealedCards - Used for the REVEAL state. Tracks how many cards player has checked.
  ready - Whether you have readied up, and how many in total have readied up
  roundRevealTime - How much time the players have to see their cards before game begins.
*/

export const roundStates = {
  WAITING_FOR_PLAYERS: 'WAITING_FOR_PLAYERS', // Before there are 2 players in the lobby
  NOT_STARTED: 'NOT_STARTED', // When not everyone has readied up
  REVEAL: 'REVEAL', // Reveal period for players before game begins
  STARTED: 'STARTED', // Right after reveal period
  OVER: 'OVER',
};

const currentState = (state = roundStates.WAITING_FOR_PLAYERS, { type }) => {
  switch (type) {
    case ALL_PLAYERS_READY:
      return roundStates.REVEAL;
    case BEGIN_GAME:
      return roundStates.NOT_STARTED;
    case ROUND_END:
      return roundStates.OVER;
    case START_ROUND:
      return roundStates.STARTED;
    default:
      return state;
  }
};

const playerRevealedCards = (state = 0, { type }) => {
  switch (type) {
    case ROUND_END:
      return 0;
    case SHOW_CARD:
      return state.playerRevealedCards++;
    default:
      return state;
  }
};

const ready = (state = { playerReady: false, totalReady: 0 }, { type, payload }) => {
  switch (type) {
    case PLAYER_READY:
      const playerReady = !state.playerReady;
      return { ...state, playerReady };
    case START_ROUND:
      return { playerReady: false, totalReady: 0 };
    case UPDATE_PLAYERS_READY:
      return { ...state, totalReady: payload };
    default:
      return state;
  }
};

const roundRevealTime = (state = null, { type, payload }) => {
  if (type === ALL_PLAYERS_READY) return payload.revealTime;
  return state;
};

export default combineReducers({
  currentState,
  playerRevealedCards,
  ready,
  roundRevealTime,
});
