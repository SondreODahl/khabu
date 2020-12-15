import usePublish from '../../../api/usePublish';

const usePublishMove = (action, parameters) => {
  const json = JSON.stringify({ action, ...parameters });
  const publish = usePublish({
    destination: '/app/round/actions',
    body: json,
  });
  if (action === null) return null;
  return publish;
};

export default usePublishMove;