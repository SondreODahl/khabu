import React, { useCallback, useEffect, useState } from 'react';
import useClient from './useClient';

export default (destination) => {
  const [message, setMessage] = useState('');
  const client = useClient();

  const subscribe = useCallback(() => {
    client.subscribe(destination, ({ body }) => {
      setMessage(body);
    });
    console.log('Subscribed');
  }, [client.connected, destination]);

  const unsubscribe = useCallback(() => {
    client.unsubscribe(destination);
  }, [client.connected, destination]);

  useEffect(() => {
    if (client.connected) {
      subscribe();
      return unsubscribe;
    }
  }, [subscribe, unsubscribe]);

  return message;
};
