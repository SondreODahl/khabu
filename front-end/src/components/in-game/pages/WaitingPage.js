import React from 'react';

const WaitingPage = () => (
  <div className={'ui inverted active dimmer'}>
    <div className={'ui text loader'}>
      <h3>Waiting for other players...</h3>
    </div>
  </div>
);

export default WaitingPage;