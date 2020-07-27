import { useSelector } from 'react-redux';
import { getServerIdForCard } from '../../selectors';
import React from 'react';

export default () => {
  const indexOfCard2 = useSelector((state) =>
    getServerIdForCard(state, { playerId: 0, id: 0 })
  );
  console.log(`Index ${indexOfCard2}`);
  return <div>{indexOfCard2}</div>;
};
