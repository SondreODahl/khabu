import { useSelector } from 'react-redux';
import { selectPlayerScore } from '../../selectors/scoresSelectors';
import React from 'react';

// Simple component for displaying a user's accumulated score
const ScoreDisplay = (props) => {
  const playerScore = useSelector((state) => selectPlayerScore(state, props));
  return (
    <div className={'score-display'}>
      <h3>Score: {playerScore}</h3>
    </div>
  );
};

export default ScoreDisplay;
