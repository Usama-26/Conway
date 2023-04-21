import axios from 'axios';
import {toast} from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
  },
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(async config => {
  return config;
});

const toastMsgs = [400, 422, 403];
axiosInstance.interceptors.response.use(
  async response => response,
  async error => {
    const originalRequest = error?.config || {};

    // if (toastMsgs.includes(error?.response?.status)) {
    if (error.response.data?.message) toast.error(error.response.data.message);
    else toast.error('Some error has been occured.');
    // }
    return Promise.reject(error);
  }
);
export default axiosInstance;
