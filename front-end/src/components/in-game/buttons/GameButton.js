import usePublishMove from '../cards/usePublishMove';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectYourId } from '../../../selectors';

export const GameButtonTypes = {
  khabu: 'khabu',
  end_turn: 'end_turn',
};

// Single, customizable game button. Used for end turn and call khabu.
// Buttons are disabled when their actions cannot be performed.
const GameButton = (props) => {
  const yourId = useSelector(selectYourId); // Only you can click the buttons in your game
  const publishButtonMove = usePublishMove(props.action, {
    currentPlayerId: yourId,
  });
  const playerCanClickButton = useSelector((state) => props.selector(state));
  const onClick = playerCanClickButton ? publishButtonMove : null;
  const buttonClassName = playerCanClickButton ? 'active' : 'disabled';
  const buttonText = props.type === GameButtonTypes.khabu ? 'Khabu' : 'End Turn';
  return (
    <div className={`game-button ${props.type}`}>
      <button
        onClick={onClick}
        className={`ui right toggle button ${buttonClassName}`}
      >
        <p className={'game-button-text'}>{buttonText}</p>
      </button>
    </div>
  );
};

export default GameButton;
