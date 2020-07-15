import { SUBSCRIPTION_MESSAGE } from '../types';

export const addSubMessage = (destination, message) => {
  return {
    type: SUBSCRIPTION_MESSAGE,
    payload: { destination, message },
  };
};