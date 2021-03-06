import { useSelector } from 'react-redux';
import { selectClient } from '../selectors';
import { useCallback } from 'react';

/*
  Hook used to publish messages to a specific destination.
  Parameters consists of a destination and a body. 
*/
const usePublish = (parameters) => {
  const { client, connected } = useSelector(selectClient);
  if (!parameters.destination || !parameters.body) {
    console.warn('Publish is missing destination or body');
  }
  const failedFunc = useCallback(() => console.log('Waiting for connection'), []);
  const returnFunc = useCallback(() => client.publish(parameters), [
    parameters,
    connected,
  ]);
  return connected ? returnFunc : failedFunc;
};
export default usePublish;
