import fetch from './config';

export default {
  getProductList() {
    return fetch.get(url, params);
  },
  getWeixin(data) {
    return fetch.get(`/member/jsapi_ticket`, data);
  }
};
