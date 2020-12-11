import { FORM_VALID, FORM_SUBMIT, FORM_ERROR, RESET_FORM } from '../actions/types';

// Form used for submitting username. Keeps track of the state the form is in. 
// Does not store the form values.
export default (state = {}, { type, payload }) => {
  switch (type) {
    case FORM_SUBMIT:
      return { ...state, data: payload, submitted: true };
    case FORM_VALID:
      return { ...state, valid: true };
    case FORM_ERROR:
      return { ...state, valid: false, error: payload };
    case RESET_FORM:
      return { ...state, valid: false, submitted: false, error: null };
    default:
      return state;
  }
};
