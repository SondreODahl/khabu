import React, { useCallback } from 'react';
import usePublish from '../../../api/usePublish';
import { useSelector, useDispatch } from 'react-redux';
import { toggleReady } from '../../../actions';
import { selectReady, selectYourId } from '../../../selectors';

// Button for readying up between each game. Also contains the message of total players ready.
const ReadyUpButton = () => {
  const yourId = useSelector(selectYourId);
  const publishToggleReady = usePublish({
    destination: '/app/round/flow',
    body: yourId,
  });
  const dispatch = useDispatch();
  const { playerReady, totalReady } = useSelector(selectReady);
  const readyUp = useCallback(() => {
    publishToggleReady(); // This will update the total amount of ready players for all clients
    dispatch(toggleReady()); // However, this is necessary to update whether you are ready yourself
  }, [playerReady]);

  const buttonClassName = playerReady ? 'active' : 'inactive';
  const readyMsg = `${totalReady} players ready`;
  return (
    <div className={'ready-up-button'}>
      <button className={`ui toggle button ${buttonClassName}`} onClick={readyUp}>
        Ready
      </button>
      <p className={'ready-message'}>{readyMsg}</p>
    </div>
  );
};

export default ReadyUpButton;
