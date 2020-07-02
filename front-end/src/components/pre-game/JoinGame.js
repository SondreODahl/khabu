import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { formSubmit, joinSubmit } from '../../actions';
import { useRESTPost, useRESTPostUserName } from '../../api/RESTServer';
import JoinForm from './JoinForm';
import { FORM_INVALID, RESET_FORM } from '../../actions/types';

export default (props) => {
  const history = useHistory();
  const { postRESTData } = useRESTPostUserName();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.data);
  const submitted = useSelector((state) => state.form.submitted);
  const validForm = useSelector((state) => state.form.valid);
  const response = useSelector((state) => state.data.post_data);

  useEffect(() => {
    if (submitted) {
      postRESTData('/api/player', { username: formData });
    }
  }, [formData, submitted]);

  useEffect(() => {
    if (validForm) {
      dispatch({ type: RESET_FORM });
      history.push('/game');
    }
  }, [validForm]);

  return (
    <div>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <JoinForm />
    </div>
  );
};
