import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { submitForm } from '../../actions';
import { useHistory } from 'react-router-dom';
import JoinFormErrorMessage from './JoinFormErrorMessage';

const JoinForm = (props) => {
  const { register, errors, handleSubmit } = useForm({
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
  });
  const dispatch = useDispatch();
  const history = useHistory(); // Used for passing down to the thunk

  const onSubmit = (data) => {
    // Username will be validated. Not certain that it has been already taken though
    dispatch(submitForm(data.username, history));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={'ui error form'}>
        <h3>Enter username:</h3>
        <div className={'ui action input '}>
          <input name={'username'} type={'text'} ref={register(formConditions)} />
          <input type={'submit'} className={'ui teal button'} value={'Submit'} />
        </div>
      </form>
      <JoinFormErrorMessage formError={props.formError} errors={errors} />
    </div>
  );
};

const formConditions = {
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
};

export default JoinForm;
