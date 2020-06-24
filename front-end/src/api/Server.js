import Axios from 'axios';
import { config } from './Constants';

export default Axios.create({
  baseURL: config.url.API_URL, // TODO: Add production URL
});
