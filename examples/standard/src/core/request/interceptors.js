/**
 * interceptors.js
 *
 * This is the interceptors, you can do somthing before request or after request.
 *
 */

import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(config => config, error => Promise.reject(error));

// Add a response interceptor
axios.interceptors.response.use((response) => {
  const { status, data } = response;
  if (status === 200) {
    return data;
  }
  // Do something such as redirect to login
  return Promise.reject(data);
}, (error) => {
  if (axios.isCancel(error)) {
    // Request cancel
  } else if (navigator && !navigator.onLine) {
    // Network is disconnect
  } else {
    // Other error
  }
  return Promise.reject(error);
});
