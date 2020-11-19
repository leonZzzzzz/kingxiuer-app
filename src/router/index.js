import Vue from 'vue';
import Router from 'vue-router';
import ListNormal from '@/views/list/normal';
import ListRule from '@/views/list/rule';
import ChartNormal from '@/views/chart/normal';
import ChartRule from '@/views/chart/rule';
import RecordNormal from '@/views/record/normal';
import RecordRule from '@/views/record/rule';
import Camera from '@/views/camera/camera';
import Share from '@/views/share/share';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/list/normal',
      component: ChartNormal,
      meta: {
        name: 'tabbar',
      },
    },
    {
      path: '/list/rule',
      component: ChartRule,
      meta: {
        name: 'tabbar',
      },
    },
    {
      path: '/chart/normal',
      component: ListNormal,
      meta: {
        name: 'tabbar',
      },
    },
    {
      path: '/chart/rule',
      component: ListRule,
      meta: {
        name: 'tabbar',
      },
    },
    {
      path: '/record/rule',
      component: RecordRule,
    },
    {
      path: '/record/normal',
      component: RecordNormal,
    },
    {
      path: '/camera',
      component: Camera,
    },
    {
      path: '/share',
      component: Share,
    },
  ],
});
