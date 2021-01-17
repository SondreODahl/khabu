import { playerDrewFromDeck } from '../cardActions';
import {
  playerCalledKhabu,
  playerDiscardedCard,
  playerPutCard,
  playerSwappedCard,
  playerTransferredCard,
} from '../inGameActions';
import { endTurn } from '../turnActions';
import {
  activateEffect,
  playerChoseCard,
  playerFinishedEffect,
  playerCheckedCard,
  playerExchangedCards,
} from '../effectActions';
/*   public -  Messages everyone receives during gameplay.
            Types: DECK / DISCARD / SWAP / END_TURN / PUT / TRANSFER / KHABU / ACTIVATE_EFFECT / 
            CHOOSE_CARD_EFFECT / PLAYER_CHECK_OPPONENT / PLAYER_CHECK_SELF / FINISH_EFFECT
*/

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
      const swap = parsedJSON.swap === 'true'; // Sent as string from backend
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
