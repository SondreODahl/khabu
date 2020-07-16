import { FORM_SUBMIT, PLAYER_JOIN_GAME } from '../../../actions/types';
import { combineReducers } from 'redux';

const ownPlayerId = 1;

function addUserId(state, key, payload) {
  const username = payload.username;
  return { ...state, [key]: username };
}

const playerById = (state = {}, { type, payload }) => {
  switch (type) {
    case FORM_SUBMIT:
      return addUserId(state, [ownPlayerId], payload);
    case PLAYER_JOIN_GAME:
      return addUserId(state, payload.id, payload);
  }
};

const allPlayers = (state = [], { type, payload }) => {
  switch (type) {
    case FORM_SUBMIT:
    case PLAYER_JOIN_GAME:
      return state.concat(payload.id); // TODO: Reconsider if Id should be front-end or back-end id
    default:
      return state;
  }
};

const playerCapacity = (state = 2, { type, action }) => {
  return state;
};

export default combineReducers({
  playerById,
  allPlayers,
  playerCapacity,
});
