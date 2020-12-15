import { useSelector } from 'react-redux';
import { selectPlayerScore } from '../../selectors/scoresSelectors';
import React from 'react';

const ScoreDisplay = (props) => {
  const playerScore = useSelector((state) => selectPlayerScore(state, props));
  return (
    <div>
      <h3>Score: {playerScore}</h3>
    </div>
  );
};

export default ScoreDisplay;