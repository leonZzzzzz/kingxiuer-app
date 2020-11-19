// import Vue from 'vue'
import axios from 'axios';
// import router from '../router/index';
axios.defaults.timeout = 60000; // 响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = `${process.env.NODE_API}/app/m`;
axios.interceptors.response.use((success) => {
  console.log('请求发送到了后台');
  if (success.data.errCode === 0) {
    console.log('真正的业务操作成功');
    return Promise.resolve(success);
  }
  // Vue.$vux.toast.show({ text: success.data.message, type: 'text' })
  console.warn(`业务遇到了问题，错误码：${success.data.errCode}；错误信息：${success.data.errMsg}`);
  return Promise.reject(success);
}, (error) => {
  console.dir('全是服务器的问题', error);
  return Promise.reject(error);
});

export default {
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params })
        .then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  upLoad(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, { params }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
