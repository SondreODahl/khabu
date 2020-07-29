import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
const selectGameState = (state) => state.gameState;

export * from './cardSelectors';

export const selectRoundState = (state) => state.round.currentState;

export const selectYourId = (state) => state.players.yourId;
export const selectAllPlayers = (state) => state.players.allPlayers;
export const selectOpponentId = createSelector(
  selectYourId,
  selectAllPlayers,
  (yourId, allPlayers) => allPlayers.filter((ids) => ids !== yourId).pop()
);
const selectPlayer = (id) => (state) => state.players.byId[id];
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
