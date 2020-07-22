import { Client } from '@stomp/stompjs';
import { config } from './Constants';
import { useDispatch } from 'react-redux';
import { setClient, setClientConnected } from '../actions';
import { useEffect } from 'react';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const client = new Client({
      brokerURL: config.url.WEB_SOCKET_URL,
      onStompError: (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
      onConnect: () => {
        console.log('Connected');
        dispatch(setClientConnected(true)); // Update redux store that client is connected
      },
      onDisconnect: () => {
        console.log('Disconnected');
        dispatch(setClientConnected(false)); // Update redux store that client is disconnected
      },
    });

    if (!client.active) {
      client.activate();
    }
    dispatch(setClient(client)); // Update client. Realistically only happens once
  }, [dispatch]);
};
