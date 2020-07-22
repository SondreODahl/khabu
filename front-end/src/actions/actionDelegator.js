import { updatePlayersReady } from './roundActions';
import { ALL_PLAYERS_READY } from './types';

export const roundActionDelegator = (topic, body) => {
  const parsedJSON = JSON.parse(body);
  const type = parsedJSON.type;
  switch (type) {
    case 'READY':
      return updatePlayersReady(parsedJSON.playersReady);
    case 'INITIALIZE':
      return { type: ALL_PLAYERS_READY, payload: parsedJSON.value };
    default:
      alert(`RoundActionDelegator was called with ${body}`);
  }
};
