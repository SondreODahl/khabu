import {
  ALL_PLAYERS_READY,
  ROUND_END,
  SHOW_CARD,
  START_ROUND,
} from '../actions/types';

const roundStates = {
  NOT_STARTED: 'NOT_STARTED',
  INITIALIZING: 'INITIALIZING',
  STARTED: 'STARTED',
  OVER: 'OVER',
};

const initialState = {
  currentState: roundStates.NOT_STARTED,
  playerRevealedCards: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_PLAYERS_READY:
      return { ...state, currentState: roundStates.INITIALIZING };
    case START_ROUND:
      return { ...state, currentState: roundStates.STARTED };
    case ROUND_END:
      return { ...state, currentState: roundStates.OVER, playerRevealedCards: 0 };
    case SHOW_CARD:
      const playerRevealedCards = state.playerRevealedCards++;
      return { ...state, playerRevealedCards };
    default:
      return state;
  }
};
