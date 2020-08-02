import { createSelector } from 'reselect';

const selectScores = (state) => state.scores;
const selectProps = (_, props) => props;

export const selectPlayerScore = createSelector(
  selectScores,
  selectProps,
  (scores, props) => scores[props.playerId]
);
