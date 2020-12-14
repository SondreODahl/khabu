import { FORM_ERROR, FORM_SUBMIT, FORM_VALID } from './types';
import { retrievePlayers } from './playerActions';

/*
  Actions related to the username and join form. 
  Should be expanded in future with gamecodes. 
*/

export const formError = (error) => {
  return { type: FORM_ERROR, payload: error };
};

export const formValid = (response) => (dispatch) => {
  dispatch({ type: FORM_VALID });
  // Since the form was valid, we will have joined a game. Retrieve information about players in the game.
  dispatch(retrievePlayers(response)); 
};

export const formSubmit = (payload) => {
  return { type: FORM_SUBMIT, payload };
};
