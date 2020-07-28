import { useSelector } from 'react-redux';
import { selectClient } from '../selectors';
import { useCallback } from 'react';

export default (parameters) => {
  const { client, connected } = useSelector(selectClient);
  if (!parameters.destination || !parameters.body) {
    console.warn('Publish is missing destination or body');
  }
  const failedFunc = useCallback(() => console.log('Waiting for connection'), []);
  const returnFunc = useCallback(() => client.publish(parameters), [connected]);
  return connected ? returnFunc : failedFunc;
};
