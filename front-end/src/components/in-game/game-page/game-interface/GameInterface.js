import NameDisplay from '../user-display/NameDisplay';
import CardHand from '../cards/card-hand/CardHand';
import CardDeck from '../cards/deck/CardDeck';
import ReadyUpButton from '../buttons/ReadyUpButton';
import TemporaryCard from '../cards/temporary-card/TemporaryCard';
import DiscardPile from '../cards/pile/DiscardPile';
import React from 'react';
import './GameInterface.css';
import GameButtons from '../buttons/game-buttons/GameButtons';

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
