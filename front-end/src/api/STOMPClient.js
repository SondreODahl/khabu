import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import GreetButton from '../components/GreetButton';
import useSubscribe from './useSubscribe';
import usePublish from './usePublish';

const STOMPClient = (props) => {
  const parameters = { destination: '/app/greeting', body: 'hello' };
  const publish = usePublish(parameters);
  const subscribe = useSubscribe('/message/greeting');

  return (
    <div className={'client body'}>
      <div>
        <button onClick={publish}>Publish</button>
      </div>
    </div>
  );
};

export default STOMPClient;
