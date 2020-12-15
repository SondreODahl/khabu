import { Link } from 'react-router-dom';
import React from 'react';
import './HomeButton.css';

const HomeButton = () => (
  <Link to={'/'}>
    <button className={'home-button'}>Home</button>
  </Link>
);

export default HomeButton;
