import { combineReducers } from 'redux';

const khabuPlayer = (state = null, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

const currentPlayersTurn = (state = null, { type, action }) => {
  switch (type) {
    default:
      return state;
  }
};

export default combineReducers({
  currentPlayersTurn,
  khabuPlayer,
});
