import { useSelector } from 'react-redux';
import { selectClient } from '../selectors';

export default (parameters) => {
  const { client, connected } = useSelector(selectClient);

  if (!parameters.destination || !parameters.body) {
    console.warn('Publish is missing destination or body');
  }

  let returnFunc = () => console.log('Waiting for connection');
  if (connected) {
    returnFunc = () => client.publish(parameters);
  }
  return returnFunc;
};
