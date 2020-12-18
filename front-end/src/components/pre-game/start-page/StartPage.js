import React from 'react';
import { Link } from 'react-router-dom';

import KhabuLogo from '../../../assets/images/khabu-logo.png';
import './StartPage.css';

// Purely rendering component. Shows the initial page you are greeted with.
const StartPage = () => {
  return (
    <div className={'start-page'}>
      <img className={'khabu-main-logo'} src={KhabuLogo} alt={'Khabu logo'} />
      <h1 className={'khabu-header-text'}>Khabu</h1>
      <div className={'button-container'}>
        <Link to={'/join'}>
          <button className={'join-button'}>Join</button>
        </Link>
        <Link to={'/rules'}>
          <button className={'rules-button'}>Rules</button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
