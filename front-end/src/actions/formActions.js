import { FORM_ERROR, FORM_SUBMIT, FORM_VALID } from './types';
import { retrievePlayers } from './playerActions';
import { axiosConfig } from '../api/axiosConfig';

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

export const submitForm = (formData, history) => async (dispatch, getState) => {
  try {
    const response = await axiosConfig.post('/api/player', { username: formData });
    const { data } = response;
    if (data.status.statusCodeValue === 201) {
      dispatch(formValid(data));
      history.push('/game');
    } else dispatch(formError(data.status.statusCodeValue)); // TODO: Message for full game
  } catch (err) {
    dispatch(formError(err.message));
  }
};
