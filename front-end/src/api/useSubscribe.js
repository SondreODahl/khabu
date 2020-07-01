import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubMessage } from '../actions';

export default (destination) => {
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client);
  const connected = useSelector((state) => state.connected);

  const subscribe = useCallback(() => {
    console.log('Subscribed to', destination);
    const sub = client.subscribe(destination, ({ body }) => {
      // Below happens every time message is received
      console.log(body);
      console.log(sub);
      dispatch(addSubMessage(destination, body));
    });
    return sub;
  }, [client, destination, dispatch]);

  const unsubscribe = useCallback(
    (sub) => {
      sub.unsubscribe();
      console.log('Unsubscribed from', destination);
    },
    [destination]
  );

  useEffect(() => {
    if (connected) {
      const sub = subscribe();
      return () => unsubscribe(sub);
    }
  }, [connected, subscribe, unsubscribe]);
};
