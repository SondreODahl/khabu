import {
  ALL_PLAYERS_READY,
  BEGIN_GAME,
  ROUND_END,
  SHOW_CARD,
  START_ROUND,
} from '../../actions/types';
import readyReducer from './readyReducer';
import { combineReducers } from 'redux';

export const roundStates = {
  WAITING_FOR_PLAYERS: 'WAITING_FOR_PLAYERS',
  NOT_STARTED: 'NOT_STARTED',
  INITIALIZING: 'INITIALIZING',
  STARTED: 'STARTED',
  OVER: 'OVER',
};

const currentState = (state = roundStates.WAITING_FOR_PLAYERS, { type }) => {
  switch (type) {
    case BEGIN_GAME:
      return roundStates.NOT_STARTED;
    case ALL_PLAYERS_READY:
      return roundStates.INITIALIZING;
    case START_ROUND:
      return roundStates.STARTED;
    case ROUND_END:
      return roundStates.OVER;
    default:
      return state;
  }
};

const playerRevealedCards = (state = 0, { type, payload }) => {
  switch (type) {
    case SHOW_CARD:
      return state.playerRevealedCards++;
    case ROUND_END:
      return 0;
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
  ready: readyReducer,
  roundRevealTime,
});
