import React from 'react';
import { Link } from 'react-router-dom';
import khabulogo from '../../assets/images/khabu-logo.png';

export default () => {
  return (
    <div className={'ui centered grid'}>
      <div className={'four column centered row'}>
        <img
          src={khabulogo}
          alt={'Khabu logo'}
          style={{ width: '40%', height: '60%' }}
        />
      </div>
      <div className={'four column centered row'}>
        <h1>Khabu</h1>
      </div>
      <div className={'two column centered row'}>
        <Link to={'/join'}>
          <button className={'ui teal large button'}>Join</button>
        </Link>
        <Link to={'/test'}>
          <button className={'ui teal large button'}>Test</button>
        </Link>
      </div>
    </div>
  );
};
