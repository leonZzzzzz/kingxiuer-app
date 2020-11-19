import fetch from './config';
// eslint-disable-next-line
import qs from 'qs';

export default {
  get(url, params = {}) {
    params.uid = localStorage.getItem('uid');
    return fetch.get(url, params);
  },
  post(url, params = {}) {
    params.uid = localStorage.getItem('uid');
    return fetch.post(url, qs.stringify(params));
  },
  json(url, params = {}) {
    params.uid = localStorage.getItem('uid');
    return fetch.post(url, params);
  },
  upLoad(url, params = {}) {
    params.uid = localStorage.getItem('uid');
    return fetch.upLoad(url, params);
  },
};
