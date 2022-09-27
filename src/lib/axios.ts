import axios from 'axios';

const BASE_URL = 'http://localhost:5050/';

export default axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
