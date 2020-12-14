import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectClient } from '../selectors';

const useSubscribe = (destination, actionFunction, onSubFunc = () => {}) => {
  const dispatch = useDispatch();
  const { client, connected } = useSelector(selectClient);

  const subscribe = useCallback(() => {
    console.log('Subscribed to', destination);
    const sub = client.subscribe(destination, ({ body }) => {
      // Below happens every time message is received
      console.log(body);
      dispatch(actionFunction(destination, body));
    });
    onSubFunc();
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

export default useSubscribe;
