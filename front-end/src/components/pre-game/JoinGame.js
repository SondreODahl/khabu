import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joinSubmit } from '../../actions';
import { useRESTPost } from '../../api/RESTServer';
import JoinForm from './JoinForm';

export default (props) => {
  return (
    <div>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <JoinForm />
    </div>
  );
};
