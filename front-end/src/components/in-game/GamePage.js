import React from 'react';
import { useSelector } from 'react-redux';
import ReadyUpButton from './ReadyUpButton';
import { roundStates } from '../../reducers/roundReducer';

export default () => {
  const username = useSelector((state) => state.form.data);
  const roundState = useSelector((state) => state.round.currentState);
  const TIMEOUT = 10 * 1000; // TODO: Make more dynamic

  const determineRender = () => {
    switch (roundState) {
      case roundStates.NOT_STARTED:
        return <ReadyUpButton TIMEOUT={TIMEOUT} />;
      case roundStates.INITIALIZING:
      case roundStates.STARTED:
      case roundStates.OVER:
      default:
        return null;
    }
  };

  return (
    <div>
      {username}
      {determineRender()}
    </div>
  );
};
