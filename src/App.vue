<template>
  <div id="app">
    <v-tab v-if="$route.meta.name == 'tabbar'" @onTabChange="onTabChange"></v-tab>
    <router-view/>
  </div>
</template>

<script>
import VTab from '@/components/tab/tab';
import qs from 'qs';

export default {
  components: {
    VTab,
  },
  name: 'App',
  created() {
    localStorage.setItem('uid', qs.parse(location.href.split('?')[1]).uid);
  },
  methods: {
    onTabChange(index) {
      if (index === 0) {
        this.$router.push('/list/normal');
      } else {
        this.$router.push('/list/rule');
      }
    },
  },
};
</script>

<style lang="less">
@import url('//at.alicdn.com/t/font_693880_wf3sd8w29ub.css');
@import url('./assets/css/common.less');

html,body,div,section,p,h1,h2,h3,h4,h5,h6,ul,li {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
