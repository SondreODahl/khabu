import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        Enter username:
        <input name={'userName'} type={'text'} ref={register} />
      </form>
    </div>
  );
};
