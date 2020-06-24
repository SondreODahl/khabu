import Axios from "axios";
import { config } from "./Constants";

export default Axios.create({
  baseURL: config.url, // TODO: Add production URL
});
