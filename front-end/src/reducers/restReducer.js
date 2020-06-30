import { SET_DATA } from '../actions/types';

export default (state = 'No data', action) => {
  switch (action.type) {
    case SET_DATA:
      return action.payload.data;
    default:
      return state;
  }
};
