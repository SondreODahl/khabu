import { FORM_ERROR, FORM_SUBMIT, FORM_VALID } from './types';
import { retrievePlayers } from './playerActions';

export const formError = (error) => {
  return { type: FORM_ERROR, payload: error };
};

export const formValid = (response) => (dispatch) => {
  dispatch({ type: FORM_VALID });
  dispatch(retrievePlayers(response));
};

export const formSubmit = (payload) => {
  return { type: FORM_SUBMIT, payload };
};
