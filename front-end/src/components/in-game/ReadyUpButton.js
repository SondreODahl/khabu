import React, { useCallback, useEffect } from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useSelector, useDispatch } from 'react-redux';
import { startRound, toggleReady, updatePlayersReady } from '../../actions';
import { initializeRound } from '../../actions';
import { roundActionDelegator } from '../../actions/actionDelegator';

export default (props) => {
  const dispatch = useDispatch();
  const playersReady = useSelector((state) => state.round.ready.totalReady);
  const ready = useSelector((state) => state.round.ready.playerReady);
  const publishToggleReady = usePublish({
    destination: '/app/round/flow',
    body: props.yourId,
  });

  const readyUp = useCallback(() => {
    publishToggleReady();
    dispatch(toggleReady());
  }, [ready]);

  useEffect(
    () => () => {
      setTimeout(() => dispatch(startRound(1)), props.TIMEOUT); // Set the length of reveal time
    },
    []
  );

  const buttonClassName = ready ? 'active' : 'inactive';
  const readyMsg = `${playersReady} players ready`;
  return (
    <div>
      <button className={`ui toggle button ${buttonClassName}`} onClick={readyUp}>
        Ready
      </button>
      {readyMsg}
    </div>
  );
};
