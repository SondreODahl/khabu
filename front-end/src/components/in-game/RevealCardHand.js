import { useSelector } from 'react-redux';
import Card from './Card';
import React from 'react';

export default () => {
  const cards = useSelector((state) => state.cards);
  const renderCards = () => {
    return Object.entries(cards).map((card) => {
      return <Card value={1} id={card} />;
    });
  };

  return <div>{renderCards()}</div>;
};
