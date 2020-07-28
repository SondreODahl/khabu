import usePublish from '../../../api/usePublish';

export default (action, parameters) => {
  if (action === null) return null;
  const json = JSON.stringify({ action, ...parameters });
  return usePublish({
    destination: '/app/round/actions',
    body: json,
  });
};
