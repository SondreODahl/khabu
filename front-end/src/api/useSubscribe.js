import { useCallback, useEffect, useState } from 'react';

export default (client, destination) => {
  const [message, setMessage] = useState('');

  console.log('Running', destination);

  const subscribe = useCallback(() => {
    client.subscribe(destination, ({ body }) => {
      console.log(body);
      setMessage(body);
    });
    console.log('Subscribed to', destination);
  }, [client, destination]);

  const unsubscribe = useCallback(() => {
    client.unsubscribe(destination);
    console.log('Unsubscribed from', destination);
  }, [client, destination]);

  useEffect(() => {
    if (client.connected) {
      subscribe();
      return unsubscribe;
    }
  }, [client.connected, subscribe, unsubscribe]);

  if (!message) {
    return 'No message yet';
  }
  return message;
};
