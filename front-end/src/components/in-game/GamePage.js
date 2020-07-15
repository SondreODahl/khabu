import React from 'react';
import { useSelector } from 'react-redux';
import ReadyUpButton from './ReadyUpButton';

export default () => {
  const username = useSelector((state) => state.form.data);

  return (
    <div>
      {username}
      <ReadyUpButton />
    </div>
  );
};
