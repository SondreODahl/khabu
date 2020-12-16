import usePublish from '../../../api/usePublish';

// usePublish wrapper-hook to publish a move to everyone. Takes in the action to be performed
// and the necessary parameters the server requires. Returns a function. 
const usePublishMove = (action, parameters) => {
  const json = JSON.stringify({ action, ...parameters });
  const publish = usePublish({
    destination: '/app/round/actions',
    body: json,
  });
  if (action === null) return null; // TODO: Find out why this is here
  return publish;
};

export default usePublishMove;