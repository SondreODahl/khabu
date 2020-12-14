import { getCanCallKhabu, getCanEndTurn } from '../../../selectors';
import GameButton from './GameButton';
import React from 'react';

export default (props) => (
  <div className={'ui grid'}>
    <div className={'two column centered row button-row'}>
      <div className={'column'}>
        <GameButton
          action={'CALL_KHABU'}
          playerId={props.playerId}
          selector={getCanCallKhabu}
          type={'khabu'}
        />
      </div>
      <div className={'column'}>
        <GameButton
          action={'END_TURN'}
          playerId={props.playerId}
          selector={getCanEndTurn}
          type={'end-turn'}
        />
      </div>
    </div>
  </div>
);
