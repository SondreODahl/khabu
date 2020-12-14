import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { formError, formValid, submitForm } from '../../actions';
import { axiosConfig } from '../../api/axiosConfig';
import JoinForm from './JoinForm';
import { RESET_FORM } from '../../actions/types';
import { selectFormAttributes } from '../../selectors';

// Page for joining a game with a username
const JoinGamePage = (props) => {
  const dispatch = useDispatch();
  const { error } = useSelector(selectFormAttributes);

  useEffect(() => {
    dispatch({ type: RESET_FORM });
  }, []);

  return (
    <div>
      <Link to={'/'}>
        <button className={'ui blue button'}>Home</button>
      </Link>
      <div className={'ui hidden divider'} />
      <JoinForm formError={error} />
    </div>
  );
};

export default JoinGamePage;
