import { SUBMIT_JOIN_GAME } from '../actions/types';

export default (state = { username: '' }, { type, payload }) => {
  switch (type) {
    case SUBMIT_JOIN_GAME:
      return { ...state, username: payload.username };
    default:
      return state;
  }
};
