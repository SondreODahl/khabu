import { useSelector } from 'react-redux';
import { selectPlayerScore } from '../../selectors/scoresSelectors';
import React from 'react';

// Simple component for displaying a user's accumulated score
const ScoreDisplay = (props) => {
  const playerScore = useSelector((state) => selectPlayerScore(state, props));
  return <h3 className={'score-display'}>score: {playerScore}</h3>;
};

export default ScoreDisplay;
