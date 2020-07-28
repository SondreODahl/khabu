import usePublish from '../../../api/usePublish';

export default (action, parameters) => {
  const json = JSON.stringify({ action, ...parameters });
  return usePublish({
    destination: '/app/round/actions',
    body: json,
  });
};
