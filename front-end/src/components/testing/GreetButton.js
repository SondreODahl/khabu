import React from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useDispatch, useSelector } from 'react-redux';
import { addSubMessage } from '../../actions';
import { retrievePlayers } from '../../actions/playerActions';

export default () => {
  useSubscribe('/topic/greeting', addSubMessage, undefined);
  const message = useSelector((state) => state.api.subscriptions['/topic/greeting']);
  const greetPublish = usePublish({
    destination: '/app/greeting',
    body: 'Greet',
  });

  const dispatch = useDispatch();
  const test_json = {
    type: 'PLAYER_INFO',
    yourId: 1,
    playerIds: { 1: 'Humlesnurr', 2: 'Whackamole' },
  };

  return (
    <div>
      <button className={'ui teal button'} onClick={greetPublish}>
        Publish
      </button>
      <button
        className={'ui blue button'}
        onClick={() => dispatch(retrievePlayers(test_json))}
      >
        JSON
      </button>
      {message}
    </div>
  );
};
