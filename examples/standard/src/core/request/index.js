/**
 * request
 *
 * Abstract the axios request method, you can call get, post, put, del directly
 * @params url, [params], [options]
 *
 */

import axios from 'axios';
import './interceptors';

// The baseURL for all request, sometimes you will specifies the mock server url
const baseURL = '';

// Request config
const reqConfig = {
  baseURL,
  withCredentials: process.env.NODE_ENV === 'production',
};

// The http header that carries the xsrf token value { X-XSRF-TOKEN: '' }
const csrfConfig = {};

const noneBodyMethod = ['get', 'delete', 'head'];

// Build uniform request
async function buildRequest(method, url, params, options) {
  let param = {};
  let config = {};
  if (noneBodyMethod.indexOf(method) >= 0) {
    param = { params: { ...params }, ...reqConfig, ...options };
  } else {
    param = JSON.stringify(params);
    config = {
      ...reqConfig,
      headers: {
        'Content-Type': 'application/json',
        ...csrfConfig,
      },
    };
    config = Object.assign({}, config, options);
  }
  return axios[method](url, param, config);
}

export const get = (url, params = {}, options) => buildRequest('get', url, params, options);

export const post = (url, params = {}, options) => buildRequest('post', url, params, options);

export const put = (url, params = {}, options) => buildRequest('put', url, params, options);

export const del = (url, params = {}, options) => buildRequest('delete', url, params, options);
