import React, { useCallback, useEffect } from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useSelector, useDispatch } from 'react-redux';
import { startRound, toggleReady, updatePlayersReady } from '../../actions';
import { initializeRound } from '../../actions';

export default (props) => {
  const dispatch = useDispatch();
  const playersReady = useSelector((state) => state.round.ready.totalReady);
  const ready = useSelector((state) => state.round.ready.playerReady);
  const playerCap = useSelector((state) => state.players.playerCapacity);
  const publishToggleReady = usePublish({
    destination: '/app/ready',
    body: props.yourId,
  });
  useSubscribe('/topic/ready', updatePlayersReady, undefined);

  useEffect(() => {
    if (playersReady === playerCap)
      // TODO: Replace with message from server
      dispatch(initializeRound());
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
