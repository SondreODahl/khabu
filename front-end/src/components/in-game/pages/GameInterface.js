import NameDisplay from '../NameDisplay';
import CardHand from '../cards/CardHand/CardHand';
import CardDeck from '../cards/CardDeck';
import ReadyUpButton from '../buttons/ReadyUpButton';
import TemporaryCard from '../cards/TemporaryCard';
import DiscardPile from '../cards/DiscardPile';
import React from 'react';
import './GameInterface.css';
import GameButtons from '../buttons/GameButtons';

// Renders the game board for two players.
const GameInterface = (props) => {
  return (
    <div className={'game-interface'}>
      <div className={'opponent-area'}>
        <NameDisplay playerId={props.opponentId} />
        <CardHand playerId={props.opponentId} />
      </div>
      <div className={'deck-area'}>
        <CardDeck />
        <DiscardPile />
        <TemporaryCard />
        {props.readyUp && <ReadyUpButton />}
      </div>
      <div className={'player-area'}>
        <GameButtons />
        <CardHand playerId={props.yourId} />
        <NameDisplay playerId={props.yourId} />
      </div>
    </div>
  );
};

export default GameInterface;
