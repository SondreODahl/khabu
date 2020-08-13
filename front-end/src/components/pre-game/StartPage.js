import React from 'react';
import { Link } from 'react-router-dom';
import KhabuLogo from '../../assets/images/khabu-logo.png';

export default () => {
  return (
    <div className={'ui grid'}>
      <div className={'centered row khabu-logo'}>
        <img
          src={KhabuLogo}
          alt={'Khabu logo'}
          style={{ width: '40%', height: '100%' }}
        />
      </div>
      <div className={'two column centered row'}>
        <h1>Khabu</h1>
        <br />
        <Link to={'/join'}>
          <button className={'ui teal large button'}>Join</button>
        </Link>
        <Link to={'/rules'}>
          <button className={'ui teal large button'}>Rules</button>
        </Link>
      </div>
    </div>
  );
};
