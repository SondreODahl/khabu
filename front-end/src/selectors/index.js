import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

const selectCard = (id) => (state) => state.cards.byId[id];
const selectCardHand = (playerId) => (state) => state.cards[playerId];

const selectForm = (state) => state.form;
export const selectFormAttributes = createSelector(selectForm, (form) => ({
  formData: form.data,
  error: form.error,
  submitted: form.submitted,
  validForm: form.valid,
}));
