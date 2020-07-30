import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
const selectGameState = (state) => state.gameState;

export * from './cardSelectors';
export * from './playerSelectors';
export * from './gameStateSelectors';
export * from './turnSelectors';

export const selectRoundState = (state) => state.round.currentState;
export const selectProps = (_, props) => props;

const selectPlayerReady = (state) => state.round.ready.playerReady;
const selectTotalReady = (state) => state.round.ready.totalReady;
export const selectReady = createSelector(
  selectPlayerReady,
  selectTotalReady,
  (playerReady, totalReady) => ({ playerReady, totalReady })
);

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
