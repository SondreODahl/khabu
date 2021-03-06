import { Client } from '@stomp/stompjs';
import { config } from '../constants/api';
import { useDispatch } from 'react-redux';
import { setClient, setClientConnected } from '../actions';
import { useEffect } from 'react';

/*
  Hook used to activate the stompJs client and configure it.
  Will send the client to the redux state. Should only be called once.
*/
const useSTOMPClient = () => {
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
      onWebSocketClose: () => {
        console.log('Web socket closed');
        dispatch(setClientConnected(false)); // Update redux store that client is disconnected
      },
    });

    if (!client.active) {
      client.activate();
    }
    dispatch(setClient(client)); // Update client. Realistically only happens once
  }, [dispatch]);
};

export default useSTOMPClient;
