import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joinSubmit } from '../../actions';
import { useRESTPost } from '../../api/RESTServer';

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
            required: { value: true, message: 'You must input a username' },
            minLength: {
              value: 5,
              message: 'Username must be minimum 5 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must be maximum 20 characters',
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: 'Username must be only letters/numbers',
            },
          })}
        />
        {errors?.userName && errors?.userName?.types?.pattern && (
          <div>Username must be only letters and numbers</div>
        )}
        {errors?.userName && errors?.userName?.types?.maxLength && (
          <div>Username must be maximum 20 characters</div>
        )}
        {errors?.userName && errors?.userName?.types?.minLength && (
          <div>Username must be minimum 5 characters</div>
        )}
        {errors?.userName && errors?.userName?.types?.required && (
          <div>Username must be minimum 5 characters</div>
        )}
      </form>
    </div>
  );
};
