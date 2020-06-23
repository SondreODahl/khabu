import Axios from "axios";

export default Axios.create({
  baseURL: "http://localhost:8080", // TODO: Add production URL
});
