import {
  FORM_INVALID,
  FORM_SUBMIT,
  FORM_VALID,
  READY,
  SET_CLIENT,
  SET_CONNECTED,
  SET_DATA,
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

export const formInvalid = () => {
  return { type: FORM_INVALID };
};

export const formValid = (username) => {
  return {
    type: FORM_VALID,
    payload: username,
  };
};

export const formSubmit = (payload) => {
  return { type: FORM_SUBMIT, payload };
};
