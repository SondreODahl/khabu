import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joinSubmit } from '../../actions';
import { useRESTPost } from '../../api/RESTServer';
import JoinForm from './JoinForm';

export default (props) => {
  const history = useHistory();
  const joined = useSelector((state) => state.form.join);

  if (joined) {
    history.push('/game');
  }

  return (
    <div>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <JoinForm />
    </div>
  );
};
