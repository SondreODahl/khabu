import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRESTPost } from '../../api/RESTServer';
import { formInvalid, formSubmit, formValid } from '../../actions';
import { postRESTData } from '../../api/RESTServer';

export default (props) => {
  const { register, errors, handleSubmit } = useForm({ criteriaMode: 'all' });
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.data);

  const onSubmit = (data) => {
    // Username will be validated. Not certain that it has been already taken though
    dispatch(formSubmit(data.username));
  };

  useEffect(() => {
    if (formData) {
      (async () => {
        const response = await postRESTData('/api/player', { username: formData });
        if (response.status === 201) dispatch(formValid(formData));
        else if (response.status === 409) dispatch(formInvalid());
      })();
    }
  }, [formData]);

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
