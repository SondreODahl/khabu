import React from 'react';

// Page that renders while waiting for enough players to join a lobby. Reliant on semantic ui
const WaitingPage = () => (
  <div className={'ui inverted active dimmer'}>
    <div className={'ui text loader'}>
      <h3>Waiting for other players...</h3>
    </div>
  </div>
);

export default WaitingPage;