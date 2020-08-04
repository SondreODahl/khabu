import { useSelector } from 'react-redux';
import { getIsPlayersTurn, selectPlayerNameById } from '../../selectors';
import { selectPlayerScore } from '../../selectors/scoresSelectors';
import React from 'react';

export default (props) => {
  const playerScore = useSelector((state) => selectPlayerScore(state, props));
  return (
    <div>
      <h3>Score: {playerScore}</h3>
    </div>
  );
};
