import React from 'react';

export default (props) => {
  const image = require(`../../assets/images/red_back.png`);

  return (
    <div onClick={props.onClick}>
      <img src={image} alt={props.value} />
    </div>
  );
};
