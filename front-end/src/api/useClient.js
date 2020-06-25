import React, { useCallback, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

const stompclient = new Client({
  brokerURL: 'ws://localhost:8080/ws',
  onStompError: (frame) => {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  },
});

export default () => {
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(stompclient);
  client.onConnect = () => {
    console.log('connected to STOMPserver');
    client.subscribe('/message/greeting', ({ body }) => console.log(body));
    setConnected(true);
  };
  // TODO: Implement onDisconnect

  if (!client.active) {
    client.activate(); // Apparent fix
  }

  return client;
};
