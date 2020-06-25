import React, { useCallback, useEffect, useState } from 'react';
import useClient from './useClient';

export default (destination) => {
  const [message, setMessage] = useState('');
  const client = useClient();

  const subscribe = useCallback(() => {
    client.subscribe(destination, ({ body }) => {
      setMessage(body);
    });
  }, [client, destination]);

  const unsubscribe = useCallback(() => {
    client.unsubscribe(destination);
  }, [client, destination]);

  useEffect(() => {
    subscribe();
    return unsubscribe;
  }, [subscribe, unsubscribe]);

  return message;
};
