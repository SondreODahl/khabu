import React from 'react';

export default (props) => {
  return (
    <div onClick={props.onClick}>
      <img
        src={props.image}
        alt={props.value}
        style={{ width: '120px', height: '200px' }}
      />
    </div>
  );
};
