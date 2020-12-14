import { SUBSCRIPTION_MESSAGE } from '../../actions/types';

// Dictionary with subscriptions as keys
const initialState = {
  '/topic/ready': 0,
};

// This function is currently not used. Not sure if it should be removed or is useful in the future
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBSCRIPTION_MESSAGE:
      const { destination, message } = payload;
      return { ...state, [destination]: message };
    default:
      return state;
  }
};
