import {
  endRound,
  initializeRound,
  startRound,
  updatePlayersReady,
} from './roundActions';
import {
  drawFromDeckAndRegisterCard,
  playerDrewFromDeck,
  revealCard,
} from './cardActions';
import {
  playerCalledKhabu,
  playerDiscardedCard,
  playerPutCard,
  playerSwappedCard,
  playerTransferredCard,
} from './inGameActions';
import { endTurn } from './turnActions';
import {
  activateEffect,
  playerChoseCard,
  playerFinishedEffect,
  checkPlayerCard,
  playerCheckedCard,
  playerExchangedCards,
  revealChosenCards,
} from './effectActions';

/*
  Action delegators for each subscription path related to the game flow.
  The delegators will receive the messages from the backend, and determine which action creator to call.
  For each path, see the notion doc on the possible received messages. 
  round  -  Messages related to the flow of a round.
            Types: READY / INITIALIZE / BEGIN / END
  private - Messages only you receive during gameplay. 
            Types: ERROR / REVEAL / CARD_DRAWN / OPPONENT_CHECK / SELF_CHECK
  public -  Messages everyone receives during gameplay.
            Types: DECK / DISCARD / SWAP / END_TURN / PUT / TRANSFER / KHABU / ACTIVATE_EFFECT / 
            CHOOSE_CARD_EFFECT / PLAYER_CHECK_OPPONENT / PLAYER_CHECK_SELF / FINISH_EFFECT
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

export const privateActionsDelegator = (topic, body) => {
  const parsedJSON = JSON.parse(body);
  const type = parsedJSON.type;
  switch (type) {
    case 'ERROR':
      console.log(parsedJSON.value);
      break;
    case 'REVEAL':
      const { status, playerId, id, value } = parsedJSON;
      if (status === 'FAIL') {
        alert('You have already shown enough cards');
        break;
      } else return revealCard(playerId, id, value);
    case 'CARD_DRAWN_DECK':
      return drawFromDeckAndRegisterCard(parsedJSON.value);
    case 'CHECK_TWO_CARDS': {
      // Received from king effect
      const { victimOneValue, victimTwoValue } = parsedJSON;
      return revealChosenCards(victimOneValue, victimTwoValue);
    }
    case 'OPPONENT_CHECK': {
      const { victim, victimCard, value } = parsedJSON;
      return checkPlayerCard(victim, victimCard, value);
    }
    case 'SELF_CHECK': {
      const { playerId, targetCardIndex, value } = parsedJSON;
      return checkPlayerCard(playerId, targetCardIndex, value);
    }
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
      return playerDiscardedCard(parsedJSON.value);
    case 'SWAP': {
      const { targetCardIndex, value } = parsedJSON;
      return playerSwappedCard(targetCardIndex, value); 
    }
    case 'END_TURN': {
      const { nextPlayer } = parsedJSON;
      return endTurn(nextPlayer);
    }
    case 'PUT': {
      const { agent, victim, victimCard, status, value } = parsedJSON;
      return playerPutCard(agent, victim, victimCard, status, value);
    }
    case 'TRANSFER': {
      const { victim, victimCardIndex, agentCardIndex } = parsedJSON;
      return playerTransferredCard(victim, victimCardIndex, agentCardIndex);
    }
    case 'KHABU': {
      const { nextPlayer } = parsedJSON;
      return playerCalledKhabu(nextPlayer);
    }
    case 'ACTIVATE_EFFECT': {
      return activateEffect();
    }
    case 'CHOOSE_CARD_EFFECT': {
      const { victim, card } = parsedJSON;
      return playerChoseCard(victim, card);
    }
    case 'FINISH_EFFECT': {
      const swap  = parsedJSON.swap === "true"; // Sent as string from backend
      return playerFinishedEffect(swap);
    }
    case 'EXCHANGE_CARDS': {
      return playerExchangedCards();
    }
    case 'PLAYER_CHECK_OPPONENT': {
      const { targetPlayerId, targetCardIndex } = parsedJSON;
      return playerCheckedCard(targetPlayerId, targetCardIndex);
    }
    case 'PLAYER_CHECK_SELF': {
      const { targetCardIndex } = parsedJSON;
      return playerCheckedCard(undefined, targetCardIndex - 1);
    }
    default:
      alert(`publicActionsDelegator was called with ${body}`);
      break;
  }
};
