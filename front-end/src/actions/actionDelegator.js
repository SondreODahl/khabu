import { initializeRound, updatePlayersReady } from './roundActions';
import { ALL_PLAYERS_READY } from './types';

export const roundActionDelegator = (topic, body) => {
  const parsedJSON = JSON.parse(body);
  const type = parsedJSON.type;
  switch (type) {
    case 'READY':
      return updatePlayersReady(parsedJSON.value);
    case 'INITIALIZE':
      return initializeRound(parsedJSON.value);
    default:
      alert(`RoundActionDelegator was called with ${body}`);
  }
};
