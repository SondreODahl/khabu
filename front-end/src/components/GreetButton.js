import React from 'react';
import usePublish from '../api/usePublish';
import useSubscribe from '../api/useSubscribe';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default (props) => {
  useSubscribe('/topic/greeting');
  const message = useSelector((state) => state.subscription['/topic/greeting']);
  const greetPublish = usePublish({
    destination: '/app/greeting',
    body: 'Greet',
  });

  return (
    <div>
      <button onClick={greetPublish}>Publish</button>
      {message}
    </div>
  );
};
