import { SUBSCRIPTION_MESSAGE } from '../types';


// This function is currently not used. Not sure if it should be removed or is useful in the future
export const addSubMessage = (destination, message) => {
  return {
    type: SUBSCRIPTION_MESSAGE,
    payload: { destination, message },
  };
};
