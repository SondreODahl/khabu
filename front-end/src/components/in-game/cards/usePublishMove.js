import usePublish from '../../../api/usePublish';

export default (action, parameters) => {
  const json = JSON.stringify({ action, ...parameters });
  const publish = usePublish({
    destination: '/app/round/actions',
    body: json,
  });
  if (action === null) return null;
  return publish;
};
