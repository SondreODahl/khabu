import {
  FORM_ERROR,
  FORM_SUBMIT,
  FORM_VALID,
  READY,
  SET_CLIENT,
  SET_CONNECTED,
  GET_DATA,
  SUBSCRIPTION_MESSAGE,
} from './types';

export const setData = (data) => {
  return {
    type: GET_DATA,
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

export const formError = (error) => {
  return { type: FORM_ERROR, payload: error };
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
