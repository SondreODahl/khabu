import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { formInvalid, formSubmit, formValid, joinSubmit } from '../../actions';
import { axiosREST, useRESTPostUserName } from '../../api/RESTServer';
import JoinForm from './JoinForm';
import { FORM_INVALID, RESET_FORM } from '../../actions/types';

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.data);
  const submitted = useSelector((state) => state.form.submitted);
  const validForm = useSelector((state) => state.form.valid);

  useEffect(() => {
    if (submitted) {
      const post = async (url, data) => {
        const response = await axiosREST.post(url, data);
        if (response.status === 201) dispatch(formValid(data));
        else dispatch(formInvalid());
      };
      post('/api/player', { username: formData });
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
      {!validForm && submitted && <div>Username taken</div>}
    </div>
  );
};
