import NameDisplay from '../NameDisplay';
import CardHand from '../cards/CardHand/CardHand';
import CardDeck from '../cards/CardDeck';
import ReadyUpButton from '../buttons/ReadyUpButton';
import TemporaryCard from '../cards/TemporaryCard';
import DiscardPile from '../cards/DiscardPile';
import React from 'react';
import './GameInterface.css';
import GameButtons from '../buttons/GameButtons';
import ScoreDisplay from '../ScoreDisplay';

// Renders the game board for two players.'
// TODO: Consider using context for the props
const GameInterface = (props) => {
  return (
    <div className={'game-interface'}>
      <div className={'opponent-area'}>
        <NameDisplay playerId={props.opponentId} />
        <ScoreDisplay playerId={props.opponentId} />
        <CardHand playerId={props.opponentId} yourId={props.yourId} />
      </div>
      <div className={'deck-area'}>
        <CardDeck yourId={props.yourId} />
        <DiscardPile yourId={props.yourId} />
        <TemporaryCard />
        {props.readyUp && <ReadyUpButton yourId={props.yourId} />}
      </div>
      <div className={'player-area'}>
        <GameButtons playerId={props.yourId} />
        <CardHand playerId={props.yourId} yourId={props.yourId} />
        <ScoreDisplay playerId={props.yourId} />
        <NameDisplay playerId={props.yourId} />
      </div>
    </div>
  );
};

export default GameInterface;
