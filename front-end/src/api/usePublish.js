export default (client, parameters) => {
  if (!parameters.destination || !parameters.body) {
    console.warn('Publish is missing destination or body');
  }
  let returnFunc = () => console.log('Waiting for connection');
  // TODO: Add check for if destination is correct
  if (client.connected) {
    returnFunc = () => client.publish(parameters);
  }
  return returnFunc;
};
