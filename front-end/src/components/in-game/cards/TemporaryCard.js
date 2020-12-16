import Card from './Card/Card';
import React from 'react';
import { selectCard } from '../../../selectors';
import { useSelector } from 'react-redux';

// The card shown when drawing from the deck. Is undefined/null when there is no card
// in the drawn state. 
const TemporaryCard = () => {
  const cardId = useSelector((state) => state.cards.temporaryCard);
  if (cardId === undefined || cardId === null) {
    return null; // Not currently drawn.
  }
  return (
    <div className={'temporary-card'}>
      <Card selector={selectCard} onClick={null} id={cardId} />
    </div>
  );
};

export default TemporaryCard;