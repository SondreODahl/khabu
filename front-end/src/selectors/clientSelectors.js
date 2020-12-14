import { createSelector } from 'reselect';

const selectClientBody = (state) => state.client.body;
const selectClientConnected = (state) => state.client.connected;
export const selectClient = createSelector(
  selectClientBody,
  selectClientConnected,
  (body, connected) => ({
    client: body,
    connected,
  })
);
