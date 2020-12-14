import { createSelector } from 'reselect';

const selectScores = (state) => state.scores;
const selectProps = (_, props) => props; // Lets you use props with your selector. Must pass in props as argument in useSelector.

export const selectPlayerScore = createSelector(
  selectScores,
  selectProps,
  (scores, props) => scores[props.playerId]
);
