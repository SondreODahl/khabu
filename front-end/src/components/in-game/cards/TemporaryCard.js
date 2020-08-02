import Card from './Card/Card';
import React from 'react';
import { selectCard } from '../../../selectors';
import { useSelector } from 'react-redux';

export default () => {
  const cardId = useSelector((state) => state.cards.temporaryCard);
  if (cardId === undefined || cardId === null) {
    // Hasn't been set yet
    return null;
  }
  return (
    <div>
      <Card selector={selectCard} onClick={null} id={cardId} />
    </div>
  );
};
