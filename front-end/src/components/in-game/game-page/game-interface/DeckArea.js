import React from 'react';

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

export const DeckArea;
