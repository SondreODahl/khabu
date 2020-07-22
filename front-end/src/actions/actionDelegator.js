import { initializeRound, startRound, updatePlayersReady } from './roundActions';
import { ALL_PLAYERS_READY, BEGIN_GAME, START_ROUND } from './types';

export const roundActionDelegator = (topic, body) => {
  const parsedJSON = JSON.parse(body);
  const type = parsedJSON.type;
  switch (type) {
    case 'READY':
      const playersReady = parsedJSON.value;
      return updatePlayersReady(playersReady);
    case 'INITIALIZE':
      const revealTime = parsedJSON.value;
      return initializeRound(revealTime);
    case 'BEGIN':
      const startingPlayer = parsedJSON.value;
      return startRound(startingPlayer);
    default:
      alert(`RoundActionDelegator was called with ${body}`);
  }
};
