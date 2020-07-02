import Axios from 'axios';
import { config } from './Constants';
import { useDispatch } from 'react-redux';
import { formInvalid, formValid, setData } from '../actions';
import { POST_DATA } from '../actions/types';

export const axiosREST = Axios.create({
  baseURL: config.url.API_URL,
});

export const useRESTGet = () => {
  const dispatch = useDispatch();
  const getRESTData = (url) => {
    axiosREST.get(url).then((data) => dispatch(setData(data)));
  };

  return { getRESTData };
};
