import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Page that renders while waiting for enough players to join a lobby. Reliant on semantic ui
const WaitingPage = () => {
  const validForm = useSelector(state => state.form.valid);
  const history = useHistory();
  if (! validForm ) {
    history.push('/join');
  }
  return (
    <div className={'ui inverted active dimmer'}>
      <div className={'ui text loader'}>
        <h3>Waiting for other players...</h3>
      </div>
    </div>
  );
};

export default WaitingPage;
