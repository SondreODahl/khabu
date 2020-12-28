import NameDisplay from '../user-display/NameDisplay';
import CardHand from '../cards/card-hand/CardHand';
import React from 'react';
import './GameInterface.css';
import DeckAreaDecider from './DeckAreaDecider';

// Renders the game board for two players.
const GameInterface = (props) => {
  return (
    <div className={'game-interface'}>
      <div className={'opponent-area'}>
        <NameDisplay playerId={props.opponentId} />
        <CardHand playerId={props.opponentId} />
      </div>
      <DeckAreaDecider readyUp={props.readyUp} />
      <div className={'player-area'}>
        <CardHand playerId={props.yourId} />
        <NameDisplay playerId={props.yourId} />
      </div>
    </div>
  );
};

export default GameInterface;
