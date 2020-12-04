import { SET_CLIENT, SET_CONNECTED } from '../types';

export const setClient = (client) => {
  return {
    type: SET_CLIENT,
    payload: client,
  };
};

export const setClientConnected = (connected) => {
  return {
    type: SET_CONNECTED,
    payload: connected,
  };
};
