import Axios from 'axios';
import { config } from './Constants';
import { useDispatch } from 'react-redux';
import { setData } from '../actions';

const axiosREST = Axios.create({
  baseURL: config.url.API_URL,
});

export const useRESTServer = () => {
  const dispatch = useDispatch();
  const getRESTData = (url) => {
    axiosREST.get(url).then((data) => dispatch(setData(data)));
  };

  return { getRESTData };
};
