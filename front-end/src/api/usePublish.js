import { useSelector } from 'react-redux';

export default (parameters) => {
  const client = useSelector((state) => state.client);
  const connected = useSelector((state) => state.connected);

  if (!parameters.destination || !parameters.body) {
    console.warn('Publish is missing destination or body');
  }

  let returnFunc = () => console.log('Waiting for connection');
  if (connected) {
    returnFunc = () => client.publish(parameters);
  }
  return returnFunc;
};
