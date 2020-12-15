import React, { useCallback } from 'react';
import usePublish from '../../../api/usePublish';
import { useSelector, useDispatch } from 'react-redux';
import { toggleReady } from '../../../actions';
import { selectReady } from '../../../selectors';

const ReadyUpButton = (props) => {
  const dispatch = useDispatch();
  const { playerReady, totalReady } = useSelector(selectReady);
  const publishToggleReady = usePublish({
    destination: '/app/round/flow',
    body: props.yourId,
  });

  const readyUp = useCallback(() => {
    publishToggleReady();
    dispatch(toggleReady());
  }, [playerReady]);

  const buttonClassName = playerReady ? 'active' : 'inactive';
  const readyMsg = `${totalReady} players ready`;
  return (
    <div>
      <button className={`ui toggle button ${buttonClassName}`} onClick={readyUp}>
        Ready
      </button>
      {readyMsg}
    </div>
  );
};

export default ReadyUpButton;