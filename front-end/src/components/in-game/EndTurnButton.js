import usePublishMove from './cards/usePublishMove';
import React from 'react';
import { useSelector } from 'react-redux';
import { getCanEndTurn } from '../../selectors';

export default (props) => {
  const publishEndTurn = usePublishMove('END_TURN', {
    currentPlayerId: props.yourId,
  });
  const playerCanEndTurn = useSelector((state) => getCanEndTurn(state));
  const onClick = playerCanEndTurn ? publishEndTurn : null;
  const className = playerCanEndTurn ? 'active' : 'inactive';

  return (
    <div className={'end-turn-button'}>
      <button onClick={onClick} className={`ui toggle button ${className}`}>
        End Turn
      </button>
    </div>
  );
};
