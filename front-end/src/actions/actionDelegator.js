import { initializeRound, startRound, updatePlayersReady } from './roundActions';
import { ALL_PLAYERS_READY, BEGIN_GAME, START_ROUND } from './types';
import {
  drawFromDeckAndRegisterCard,
  playerDrewFromDeck,
  revealCard,
} from './cardActions';
import { playerDiscardedCard } from './inGameActions';

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
      const { status, playerId, id, value } = parsedJSON;
      if (status === 'FAIL') {
        alert('You have already shown enough cards');
        break;
      } else return revealCard(playerId, id - 1, value); // Id is 1-indexed in back-end..
    case 'CARD_DRAWN_DECK':
      return drawFromDeckAndRegisterCard(parsedJSON.value);
    default:
      alert(`privateActionsDelegator was called with ${body}`);
  }
};

export const publicActionsDelegator = (topic, body) => {
  const parsedJSON = JSON.parse(body);
  const type = parsedJSON.type;
  switch (type) {
    case 'DECK':
      return playerDrewFromDeck();
    case 'DISCARD':
      const value = parsedJSON.value;
      return playerDiscardedCard(value);
    default:
      alert(`publicActionsDelegator was called with ${body}`);
  }
};
