import React from 'react';
import Card from './Card';
import { getDiscardPileTopCard } from '../../../selectors';

export default () => {
  return (
    <div className={'discard-pile'}>
      <Card selector={getDiscardPileTopCard} />
    </div>
  );
};
