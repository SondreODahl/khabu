import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joinSubmit } from '../../actions';

export default (props) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(joinSubmit(data));
  };

  return (
    <div>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Enter username:</h3>
        <input name={'userName'} type={'text'} ref={register} />
      </form>
    </div>
  );
};
