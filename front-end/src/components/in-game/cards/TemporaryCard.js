import Card from './Card/Card';
import React from 'react';
import { selectCard } from '../../../selectors';
import { useSelector } from 'react-redux';

const TemporaryCard = () => {
  const cardId = useSelector((state) => state.cards.temporaryCard);
  if (cardId === undefined || cardId === null) {
    // Hasn't been set yet
    return null;
  }
  return (
    <div className={'temporary-card'}>
      <Card selector={selectCard} onClick={null} id={cardId} />
    </div>
  );
};

export default TemporaryCard;