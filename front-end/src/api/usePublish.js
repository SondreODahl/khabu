import useClient from './useClient';

export default (parameters) => {
  const client = useClient();

  if (!parameters.destination || !parameters.body) {
    console.warn('Publish is missing destination or body');
  }
  let returnFunc = () => console.log('Waiting for connection');
  if (client.connected) {
    returnFunc = () => client.publish(parameters);
  }
  return returnFunc;
};
