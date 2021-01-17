import {
  endRound,
  initializeRound,
  startRound,
  updatePlayersReady,
} from './roundActions';

/*
    round  -  Messages related to the flow of a round.
        Types: READY / INITIALIZE / BEGIN / END
*/

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
    case 'END':
      return endRound(parsedJSON.players);
    default:
      alert(`RoundActionDelegator was called with ${body}`);
  }
};
