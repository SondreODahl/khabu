import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubMessage } from '../actions';

export default (destination) => {
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client);
  const connected = useSelector((state) => state.connected);
  const subscribe = useCallback(() => {
    client.subscribe(destination, ({ body }) => {
      console.log(body);
      dispatch(addSubMessage(destination, body));
    });
    console.log('Subscribed to', destination);
  }, [client, destination, dispatch]);

  const unsubscribe = useCallback(() => {
    client.unsubscribe(destination);
    console.log('Unsubscribed from', destination);
  }, [client, destination]);

  useEffect(() => {
    if (connected) {
      subscribe();
      return unsubscribe;
    }
  }, [connected, subscribe, unsubscribe]);
};
