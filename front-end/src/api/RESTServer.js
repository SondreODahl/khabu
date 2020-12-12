import Axios from 'axios';
import { config } from '../constants/api';
import { useDispatch } from 'react-redux';
import { setData } from '../actions';

export const axiosREST = Axios.create({
  baseURL: config.url.API_URL,
});

