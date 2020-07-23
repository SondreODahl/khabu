import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';
const selectGameState = state => state.gameState;
const selectYourId = state => state.players.yourId;
const selectPlayer = id => state => state.players.byId[id];
const selectYourPlayer;
const getPlayerName;

const selectAllCards = state => state.cards.byId;
const selectCard = (id) => (state) => state.cards.byId[id];
const selectCardHand = (playerId) => (state) => state.cards[playerId];
const getCardsBelongingToPlayer = createSelector(selectCardHand, selectAllCards, (hand, cards) => {cards.filter()});

const selectPlayerReady = state => state.round.ready.playerReady;
const selectTotalReady = state => state.round.ready.totalReady;
export const selectReady = createSelector(
  selectPlayerReady,
  selectTotalReady,
  (playerReady, totalReady) => ({playerReady, totalReady})
)  

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
