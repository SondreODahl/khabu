import Axios from "axios";

export default axios.create({
    baseURL: 'https://localhost/8080' // TODO: Add production URL
}); 