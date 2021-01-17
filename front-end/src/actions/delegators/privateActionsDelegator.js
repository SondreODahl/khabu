import {
  drawFromDeckAndRegisterCard,
  revealCard,
} from './cardActions';
import {
  checkPlayerCard,
  revealChosenCards,
} from './effectActions';
/*
    private - Messages only you receive during gameplay. 
            Types: ERROR / REVEAL / CARD_DRAWN / OPPONENT_CHECK / SELF_CHECK
*/

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
