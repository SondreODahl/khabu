import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joinSubmit } from '../../actions';
import { useRESTPost } from '../../api/RESTServer';
import JoinForm from './JoinForm';
import { FORM_INVALID, RESET_FORM } from '../../actions/types';

export default (props) => {
  const history = useHistory();
  const validForm = useSelector((state) => state.form.valid);
  const submitted = useSelector((state) => state.form.submitted);
  const dispatch = useDispatch();

  useEffect(() => {
    if (validForm) {
      history.push('/game');
      dispatch({ type: RESET_FORM });
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
