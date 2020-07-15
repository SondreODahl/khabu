import { FORM_ERROR, FORM_SUBMIT, FORM_VALID } from './types';

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