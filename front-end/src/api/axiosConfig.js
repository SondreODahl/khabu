import Axios from 'axios';
import { config } from '../constants/api';

export const axiosConfig = Axios.create({
  baseURL: config.url.API_URL,
});

