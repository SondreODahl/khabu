import React from 'react';
import { useSelector } from 'react-redux';
import ReadyUpButton from './ReadyUpButton';
import { roundStates } from '../../reducers/game/roundReducer';
import RevealCardHand from './RevealCardHand';

export default () => {
  const yourId = useSelector((state) => state.players.yourId);
  const roundState = useSelector((state) => state.round.currentState);
  const TIMEOUT = 10 * 1000; // TODO: Make more dynamic

  const determineRender = () => {
    switch (roundState) {
      case roundStates.NOT_STARTED:
        return <ReadyUpButton TIMEOUT={TIMEOUT} yourId={yourId} />;
      case roundStates.INITIALIZING:
        return (
          <div>
            <h1>Initializing</h1>
            <RevealCardHand />
          </div>
        );
      case roundStates.STARTED:
        return <h1>Started</h1>;
      case roundStates.OVER:
        return <h1>Over</h1>;
      default:
        return <div>Error. Something has gone terribly wrong with Round State</div>;
    }
  };

  return <div>{determineRender()}</div>;
};
