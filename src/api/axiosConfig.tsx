import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Api.interceptors.request.use(config => config);

export default Api;