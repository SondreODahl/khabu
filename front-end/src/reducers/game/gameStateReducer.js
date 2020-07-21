import { combineReducers } from 'redux';

const initialState = {
  currentAction: null,
  putAllowed: false,
};

const gameState = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default gameState;
