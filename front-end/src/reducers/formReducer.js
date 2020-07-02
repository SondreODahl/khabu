import { FORM_VALID, FORM_SUBMIT, FORM_INVALID, RESET_FORM } from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FORM_SUBMIT:
      return { ...state, data: payload, submitted: true };
    case FORM_VALID:
      return { ...state, valid: true };
    case FORM_INVALID:
      return { ...state, valid: false };
    case RESET_FORM:
      return { ...state, valid: false, submitted: false };
    default:
      return state;
  }
};
