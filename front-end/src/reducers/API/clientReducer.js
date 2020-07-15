import { SET_CLIENT, SET_CONNECTED } from '../../actions/types';

export const clientReducer = (state = { active: false }, { type, payload }) => {
  switch (type) {
    case SET_CLIENT:
      return payload;
    default:
      return state;
  }
};

export const connectedClientReducer = (state = false, { type }) => {
  if (type === SET_CONNECTED) {
    return !state;
  }
  return state;
};
