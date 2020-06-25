import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

export default () => {
  const [client, setClient] = useState(new Client({}));

  useEffect(() => {
    client.brokerURL = 'ws://localhost:8080/ws';
    client.onConnect = () => {
      console.log('connected to STOMPserver');
    };
    client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    setClient(client);
  }, [client]);
  return client;
};
