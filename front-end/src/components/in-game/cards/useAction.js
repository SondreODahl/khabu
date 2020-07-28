import usePublish from '../../../api/usePublish';
import { useCallback } from 'react';

export default (action, parameters) => {
  const json = JSON.stringify({ action, ...parameters });
  const publishAction = usePublish({
    destination: '/app/round/actions',
    body: json,
  });
  return useCallback(publishAction, [action, parameters]);
};
