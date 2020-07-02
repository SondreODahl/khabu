import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { formError, formSubmit, formValid, joinSubmit } from '../../actions';
import { axiosREST, useRESTPostUserName } from '../../api/RESTServer';
import JoinForm from './JoinForm';
import { FORM_ERROR, RESET_FORM } from '../../actions/types';

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.data);
  const submitted = useSelector((state) => state.form.submitted);
  const validForm = useSelector((state) => state.form.valid);
  const error = useSelector((state) => state.form.error);

  useEffect(() => {
    if (submitted) {
      const post = async (url, data) => {
        try {
          const response = await axiosREST.post(url, data);
          if (response.status === 201) dispatch(formValid(data));
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
        <button>Home</button>
      </Link>
      <JoinForm />
      {error}
    </div>
  );
};
