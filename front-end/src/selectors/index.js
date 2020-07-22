import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

const selectCard = (id) => (state) => state.cards.byId[id];
const selectCardHand = (playerId) => (state) => state.cards[playerId];

const selectClientBody = (state) => state.api.client.body;
const selectClientConnected = (state) => state.api.client.connected;
export const selectClient = createSelector(
  selectClientBody,
  selectClientConnected,
  (body, connected) => ({
    client: body,
    connected,
  })
);

const selectForm = (state) => state.form;
export const selectFormAttributes = createSelector(selectForm, (form) => ({
  formData: form.data,
  error: form.error,
  submitted: form.submitted,
  validForm: form.valid,
}));
