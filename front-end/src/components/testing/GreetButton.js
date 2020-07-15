import React from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSubMessage } from '../../actions';

export default (props) => {
  useSubscribe('/topic/greeting', addSubMessage);
  const message = useSelector((state) => state.subscription['/topic/greeting']);
  const greetPublish = usePublish({
    destination: '/app/greeting',
    body: 'Greet',
  });

  return (
    <div>
      <button className={'ui teal button'} onClick={greetPublish}>
        Publish
      </button>
      {message}
    </div>
  );
};
