import { GET_DATA, POST_DATA } from '../actions/types';

export default (state = { get_data: {}, post_data: { response: '' } }, action) => {
  // TODO: Change class to specific for submitting form
  switch (action.type) {
    case GET_DATA:
      return { ...state, get_data: action.payload.data };
    default:
      return state;
  }
};
