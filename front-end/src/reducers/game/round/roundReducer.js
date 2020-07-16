import {
  ALL_PLAYERS_READY,
  ROUND_END,
  SHOW_CARD,
  START_ROUND,
} from '../../../actions/types';
import readyReducer from './readyReducer';
import { combineReducers } from 'redux';

export const roundStates = {
  NOT_STARTED: 'NOT_STARTED',
  INITIALIZING: 'INITIALIZING',
  STARTED: 'STARTED',
  OVER: 'OVER',
};

const currentState = (state = roundStates.NOT_STARTED, { type, payload }) => {
  switch (type) {
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
    default:
      return state;
  }
};

export default combineReducers({
  currentState,
  playerRevealedCards,
  ready: readyReducer,
});
