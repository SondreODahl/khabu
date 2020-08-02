import usePublishMove from '../cards/usePublishMove';
import React from 'react';
import { useSelector } from 'react-redux';
import { getCanEndTurn } from '../../../selectors';

export default (props) => {
  const publishButtonMove = usePublishMove(props.action, {
    currentPlayerId: props.playerId,
  });
  const playerCanClickButton = useSelector((state) => props.selector(state));
  const onClick = playerCanClickButton ? publishButtonMove : null;
  const buttonClassName = playerCanClickButton ? 'active' : 'disabled';
  const buttonText = props.type === 'khabu' ? 'Khabu' : 'End Turn';
  return (
    <div className={`game-button ${props.type}`}>
      <button
        onClick={onClick}
        className={`ui right toggle button ${buttonClassName}`}
      >
        {buttonText}
      </button>
    </div>
  );
};
