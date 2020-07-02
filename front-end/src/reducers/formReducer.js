import { FORM_VALID, FORM_SUBMIT, FORM_INVALID } from '../actions/types';

export default (state = { submitted: 0 }, { type, payload }) => {
  switch (type) {
    case FORM_SUBMIT:
      return { ...state, data: payload };
    case FORM_VALID:
      return { ...state, valid: true };
    case FORM_INVALID:
      return { ...state, valid: false };
    default:
      return state;
  }
};
