import React, { useCallback, useEffect } from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useSelector, useDispatch } from 'react-redux';
import { startRound, toggleReady, updatePlayersReady } from '../../actions';
import { initializeRound } from '../../actions';
import { roundActionDelegator } from '../../actions/actionDelegator';
import { selectReady } from '../../selectors';

export default (props) => {
  const dispatch = useDispatch();
  const { playerReady, totalReady } = useSelector(selectReady);
  const publishToggleReady = usePublish({
    destination: '/app/round/flow',
    body: props.yourId,
  });

  const readyUp = useCallback(() => {
    publishToggleReady();
    dispatch(toggleReady());
  }, [totalReady]);

  const buttonClassName = totalReady ? 'active' : 'inactive';
  const readyMsg = `${playerReady} players ready`;
  return (
    <div>
      <button className={`ui toggle button ${buttonClassName}`} onClick={readyUp}>
        Ready
      </button>
      {readyMsg}
    </div>
  );
};
