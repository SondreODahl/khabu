import { SUBSCRIPTION_MESSAGE } from '../../actions/types';

const initialState = {
  '/topic/ready': 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBSCRIPTION_MESSAGE:
      const { destination, message } = payload;
      return { ...state, [destination]: message };
    default:
      return state;
  }
};
