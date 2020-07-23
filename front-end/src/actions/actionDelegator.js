import { initializeRound, startRound, updatePlayersReady } from './roundActions';
import { ALL_PLAYERS_READY, BEGIN_GAME, START_ROUND } from './types';
import { revealCard } from './cardActions';

export const roundActionDelegator = (topic, body) => {
  const parsedJSON = JSON.parse(body);
  const type = parsedJSON.type;
  switch (type) {
    case 'READY':
      const playersReady = parsedJSON.value;
      return updatePlayersReady(playersReady);
    case 'INITIALIZE':
      const { revealTime, startingHandSize } = parsedJSON;
      return initializeRound(revealTime, startingHandSize);
    case 'BEGIN':
      const startingPlayer = parsedJSON.value;
      return startRound(startingPlayer);
    default:
      alert(`RoundActionDelegator was called with ${body}`);
  }
};

export const privateActionsDelegator = (topic, body) => {
  const parsedJSON = JSON.parse(body);
  const type = parsedJSON.type;
  switch (type) {
    case 'REVEAL':
      const { status, id, value } = parsedJSON;
      if (status === 'FAIL') {
        alert('You have already shown enough cards');
        break;
      } else return revealCard(id, value);
    default:
      alert(`privateActionsDelegator was called with ${body}`);
  }
};
