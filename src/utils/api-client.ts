import axios from 'axios';

import {getCookie} from './cookie';
//--------------------------------------------------------------------------------

const client = () => {
  const defaultOptions = {
    baseURL: 'https://norma.nomoreparties.space/api',
    headers: {
      Authorization: getCookie('accessToken')
        ? `Bearer ${getCookie('accessToken')}`
        : ''
    }
  };

  return {
    get: (url: string, options = {}) =>
      axios.get(url, {...defaultOptions, ...options}),
    post: (url: string, data?: unknown, options = {}) =>
      axios.post(url, data, {...defaultOptions, ...options}),
    put: (url: string, data: unknown, options = {}) =>
      axios.put(url, data, {...defaultOptions, ...options}),
    patch: (url: string, data: unknown, options = {}) =>
      axios.patch(url, data, {...defaultOptions, ...options}),
    delete: (url: string, options = {}) =>
      axios.delete(url, {...defaultOptions, ...options})
  };
};

export default client();
