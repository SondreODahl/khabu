import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { formSubmit } from '../../actions';

export default (props) => {
  const { register, errors, handleSubmit } = useForm({
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // Username will be validated. Not certain that it has been already taken though
    dispatch(formSubmit(data.username));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={'ui error form'}>
        <h3>Enter username:</h3>
        <div className={'ui action input '}>
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
          <input type={'submit'} className={'ui teal button'} value={'Submit'} />
        </div>
        <br />
        {(errors.username || props.formError) && (
          <div className={'ui error message compact'}>
            <ul className={'list'}>
              {errors?.username && errors?.username?.types?.pattern && (
                <li>Username must be only letters and numbers</li>
              )}
              {errors?.username && errors?.username?.types?.maxLength && (
                <li>Username must be maximum 20 characters</li>
              )}
              {errors?.username && errors?.username?.types?.minLength && (
                <li>Username must be minimum 5 characters</li>
              )}
              {errors?.username && errors?.username?.types?.required && (
                <li>Username must be minimum 5 characters</li>
              )}
              {props.formError && <li>{props.formError}</li>}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
