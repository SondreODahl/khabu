import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import JoinForm from './JoinForm';
import { RESET_FORM } from '../../actions/types';
import { selectFormAttributes } from '../../selectors';
import HomeButton from './HomeButton';

// Page for joining a game with a username
const JoinGamePage = (props) => {
  const dispatch = useDispatch();
  const { error } = useSelector(selectFormAttributes);

  useEffect(() => { // Can be moved to formAction if desirable later on
    dispatch({ type: RESET_FORM });
  }, []);

  return (
    <div className={'join-game'}>
      <HomeButton />
      <JoinForm formError={error} />
    </div>
  );
};

export default JoinGamePage;
