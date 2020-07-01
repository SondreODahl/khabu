import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRESTPost } from '../../api/RESTServer';
import { joinSubmit } from '../../actions';

export default (props) => {
  const { register, errors, handleSubmit } = useForm({ criteriaMode: 'all' });
  const dispatch = useDispatch();
  const { postRESTData } = useRESTPost();

  const onSubmit = (data) => {
    postRESTData('/api/player', { username: data.username });
    dispatch(joinSubmit(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Enter username:</h3>
        <input
          name={'username'}
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
        <input type={'submit'} />
        {errors?.username && errors?.username?.types?.pattern && (
          <div>Username must be only letters and numbers</div>
        )}
        {errors?.username && errors?.username?.types?.maxLength && (
          <div>Username must be maximum 20 characters</div>
        )}
        {errors?.username && errors?.username?.types?.minLength && (
          <div>Username must be minimum 5 characters</div>
        )}
        {errors?.username && errors?.username?.types?.required && (
          <div>Username must be minimum 5 characters</div>
        )}
      </form>
    </div>
  );
};
