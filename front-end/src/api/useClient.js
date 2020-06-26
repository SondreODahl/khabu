import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { config } from './Constants';

const stompClient = new Client({
  brokerURL: config.url.WEB_SOCKET_URL,
  onStompError: (frame) => {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  },
});

export default () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    stompClient.onConnect = () => {
      setConnected(true);
    };
    stompClient.onDisconnect = () => {
      setConnected(false);
    };
  }, [stompClient]);

  console.log('Client');

  if (!stompClient.active) {
    stompClient.activate();
  }
  return stompClient;
};
