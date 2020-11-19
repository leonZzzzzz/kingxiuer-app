// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux';
import FastClick from 'fastclick';
import App from './App';
import router from './router';
import store from './store';
import http from './api/http';

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);

// eslint-disable-next-line
Vue.prototype.toast = function (text) {
  this.$vux.toast.show({
    text,
    type: 'text',
    time: 2000,
  });
};

FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$imgHost = 'https://kingsuer-1255600302.file.myqcloud.com';

Vue.filter('statusName', (v) => {
  switch (v) {
    case 1:
      return '阴性';
    case 2:
      return '弱阳';
    case 3:
      return '阳性';
    case 4:
      return '强阳';
    case 0:
      return '无效';
    default:
      return '无效';
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app-box');
