import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: {},
    base64Img: '',
  },
  mutations: {
    setFormData(state, data) {
      state.formData = data;
    },
    setBase64Img(state, data) {
      state.base64Img = data;
    },
  },
});
