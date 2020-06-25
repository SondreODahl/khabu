import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

export default (brokerURL) => {
  const [client, setClient] = useState(new Client({}));

  useEffect(() => {
    client.brokerURL = brokerURL;
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
