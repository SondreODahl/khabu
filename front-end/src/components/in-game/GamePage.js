import React from 'react';
import { useSelector } from 'react-redux';

export default () => {
  const username = useSelector((state) => state.form.data);

  return <div>{username}</div>;
};
