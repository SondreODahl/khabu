import React from 'react';
import CardDeck from '../cards/deck/CardDeck';
import ReadyUpButton from '../buttons/ReadyUpButton';
import TemporaryCard from '../cards/temporary-card/TemporaryCard';
import DiscardPile from '../cards/pile/DiscardPile';
import GameButtons from '../buttons/game-buttons/GameButtons';

// Visual component. Renders the middle area of the deck when normal gameplay is used.
const DeckArea = (props) => (
  <div className={'deck-area'}>
    <div className={'deck-area-cards'}>
      <CardDeck />
      <DiscardPile />
      <TemporaryCard />
    </div>
    <div className={'deck-area-buttons'}>
      {props.readyUp && <ReadyUpButton />}
      <GameButtons />
    </div>
  </div>
);

export default DeckArea;
