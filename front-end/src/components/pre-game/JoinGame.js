import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joinSubmit } from '../../actions';
import { useRESTPost } from '../../api/RESTServer';
import { ErrorMessage } from '@hookform/error-message';

export default (props) => {
  const { register, errors, handleSubmit } = useForm({ criteriaMode: 'all' });
  const dispatch = useDispatch();
  const { postRESTData } = useRESTPost();

  const onSubmit = (data) => {
    postRESTData('/api/player', { player: data });
    dispatch(joinSubmit(data));
  };

  return (
    <div>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Enter username:</h3>
        <input
          name={'userName'}
          type={'text'}
          ref={register({
            required: true,
            minLength: 5,
            maxLength: 20,
            pattern: /^[A-Za-z0-9]+$/,
          })}
        />
        {errors?.userName?.type === 'pattern' &&
          'Username must be only letters and numbers'}
        {errors?.userName?.type === 'maxLength' &&
          'Username must be maximum 20 characters'}
        {errors?.userName?.type === 'minLength' &&
          'Username must be minimum 5 characters'}
      </form>
    </div>
  );
};
