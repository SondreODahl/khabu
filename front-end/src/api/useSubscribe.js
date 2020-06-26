import React, { useCallback, useEffect, useState } from 'react';
import useClient from './useClient';

export default (destination) => {
  const [message, setMessage] = useState('');
  const client = useClient();

  const subscribe = useCallback(() => {
    client.subscribe(destination, ({ body }) => {
      setMessage(body);
    });
    console.log('Subscribed to', destination);
  }, [client.connected, destination]);

  const unsubscribe = useCallback(() => {
    client.unsubscribe(destination);
  }, [client.connected, destination]); // TODO: Remove client.connected

  useEffect(() => {
    if (client.connected) {
      subscribe();
      return unsubscribe;
    }
  }, [subscribe, unsubscribe]); // TODO: Add client.connected

  return message;
};
