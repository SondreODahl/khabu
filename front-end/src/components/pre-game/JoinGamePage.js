import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { formError, formValid } from '../../actions';
import { axiosConfig } from '../../api/axiosConfig';
import JoinForm from './JoinForm';
import { RESET_FORM } from '../../actions/types';
import { selectFormAttributes } from '../../selectors';

const JoinGamePage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { formData, error, submitted, validForm } = useSelector(
    selectFormAttributes
  );

  useEffect(() => {
    if (submitted) {
      const post = async (url, data) => {
        console.log('Run now');
        try {
          const response = await axiosConfig.post(url, data);
          console.log(response.data);
          if (response.data.status.statusCodeValue === 201)
            dispatch(formValid(response.data));
          else dispatch(formError('Username taken')); // TODO: Message for full game
        } catch (err) {
          dispatch(formError(err.message));
        }
      };
      post('/api/player', { username: formData });
    }
  }, [formData, submitted]);

  useEffect(() => {
    if (validForm) {
      history.push('/game');
    }
  }, [validForm]);

  useEffect(() => {
    return () => dispatch({ type: RESET_FORM });
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
