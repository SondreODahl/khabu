import React from 'react';
import { getCanCallKhabu, getCanEndTurn } from '../../../selectors';
import GameButton, { GameButtonTypes } from './GameButton';
import {CALL_KHABU_MOVE, END_TURN_MOVE } from '../../../constants/gameMoves';
import './GameButtons.css';

// Component containg the player's action buttons during the game
const GameButtons = () => (
  <div className={'game-buttons'}>
        <GameButton
          action={CALL_KHABU_MOVE}
          selector={getCanCallKhabu}
          type={GameButtonTypes.khabu}
        />
        <GameButton
          action={END_TURN_MOVE}
          selector={getCanEndTurn}
          type={GameButtonTypes.end_turn}
        />
  </div>
);

export default GameButtons;