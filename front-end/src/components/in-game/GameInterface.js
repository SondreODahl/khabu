import NameDisplay from './NameDisplay';
import CardHand from './cards/CardHand/CardHand';
import CardDeck from './cards/CardDeck';
import TemporaryCard from './cards/TemporaryCard';
import DiscardPile from './cards/DiscardPile';
import EndTurnButton from './EndTurnButton';
import React from 'react';
import './GameInterface.css';

export default (props) => {
  return (
    <div>
      <NameDisplay playerId={props.opponentId} />
      <CardHand playerId={props.opponentId} yourId={props.yourId} />
      <div className={'opponent-air-to-deck'} />
      <div className={'ui three column grid'}>
        <CardDeck yourId={props.yourId} />
        <DiscardPile yourId={props.yourId} />
        <TemporaryCard />
      </div>
      <div className={'ui container'}>
        <div className={'ui grid'}>
          <div className={'two column centered row button-row'}>
            <EndTurnButton yourId={props.yourId} />
          </div>
        </div>
      </div>
      <CardHand playerId={props.yourId} yourId={props.yourId} />
      <NameDisplay playerId={props.yourId} />
    </div>
  );
};
