import {
  READY,
  SET_CLIENT,
  SET_CONNECTED,
  SET_DATA,
  SUBMIT_JOIN_GAME,
  SUBSCRIPTION_MESSAGE,
} from './types';

export const setData = (data) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};

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

export const addSubMessage = (destination, message) => {
  return {
    type: SUBSCRIPTION_MESSAGE,
    payload: { destination, message },
  };
};

export const toggleReady = () => {
  return { type: READY };
};

export const joinSubmit = (username) => {
  return {
    type: SUBMIT_JOIN_GAME,
    payload: { username },
  };
};
