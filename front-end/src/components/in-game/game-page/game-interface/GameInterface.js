import NameDisplay from '../user-display/NameDisplay';
import CardHand from '../cards/card-hand/CardHand';
import React from 'react';
import './GameInterface.css';
import DeckAreaDecider from './DeckAreaDecider';

// Renders the game board for two players.
const GameInterface = ({ opponentId, readyUp, roundOver, yourId }) => {
  return (
    <div className={'game-interface'}>
      <div className={'opponent-area'}>
        <NameDisplay playerId={opponentId} />
        <CardHand playerId={opponentId} />
      </div>
      <div className={'deck-area'}>
        <DeckAreaDecider readyUp={readyUp} roundOver={roundOver} />
      </div>
      <div className={'player-area'}>
        <CardHand playerId={yourId} />
        <NameDisplay playerId={yourId} />
      </div>
    </div>
  );
};

export default GameInterface;
