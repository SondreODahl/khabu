import { SET_CLIENT, SET_CONNECTED } from '../../actions/types';
import { combineReducers } from 'redux';

// The STOMP.js client object. Active is in initialstate due to conditionals existing before the object
const clientReducer = (state = { active: false }, { type, payload }) => {
  switch (type) {
    case SET_CLIENT:
      return payload;
    default:
      return state;
  }
};

// Whether the client is currently connected or not.
const connectedClientReducer = (state = false, { type }) => {
  if (type === SET_CONNECTED) {
    return !state;
  }
  return state;
};

export default combineReducers({
  body: clientReducer,
  connected: connectedClientReducer,
});
