<template>
  <div class="list">
    <div class="date">
      <i class="icon i-left" :class="{ 'no' : index === 0 }" @click="changeDate(-1)"></i>
      {{dateList[index]}}
      <i class="icon i-right" :class="{ 'no' : index === length }" @click="changeDate(1)"></i>
    </div>
    <div class="lists">
      <i class="icon i-left2" @click="jumpPage('/list/normal')"></i>
      <div>
        <div style="height: 100%; overflow: auto;">
          <v-photo-normal
            v-for="list in list"
            :key="list.id"
            :data="list"
            @delete="apiDelete"/>
        </div>
      </div>
    </div>
    <section class="button-group">
      <v-button icon="i-Assetshuju" @click="jumpPage('/list/normal')">显示图表</v-button>
      <v-button icon="i-car" @click="openPage()">购买试纸</v-button>
      <v-button icon="i-xiazai" @click="jumpPage('/share?type=normal')">导出图片</v-button>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import Echarts from 'echarts';
import { ButtonTab, ButtonTabItem } from 'vux'
import VButton from '@/components/button/button';
import VPhotoNormal from '@/components/photo/photo-normal';
import list from '../../mixin/list';

export default {
  mixins: [list],
  components: {
    VButton,
    VPhotoNormal,
    ButtonTab,
    ButtonTabItem
  },
  data() {
    return {
      type: 1,
      list: [],
      dateList: [],
      index: 0,
      length: 0,
    };
  },
  created() {
    this.apiGetCycle().then((res) => {
      this.dateList = res.data.content0.rows;
      this.index = this.dateList.length - 1;
      this.length = this.dateList.length - 1;
      this.apiGetList(1, this.dateList[this.index]);
    });
  },
  methods: {
    apiGetCycle() {
      return this.$http.get('/ovulate/getCycle.do');
    },
    apiGetLine(type, start, end) {
      this.$http.get('/ovulate/getLine.do', { type: 1, start, end })
        .then((res) => {
          const data = res.data.content0;
          const time = data.time_line.map((time) => {
            return time.substr(5, time.length-1).replace(/\s/g, '\n');
          });
        });
    },
    apiDelete(id) {
      this.$http.post('/ovulate/delete.do', { id })
        .then(() => {
          this.apiGetList(1, this.dateList[this.index]);
        });
    },
    jumpPage(url) {
      this.$router.push(url);
    },
    openPage() {
      location.href = 'https://ibuy.meiyue.com/h5/product/new/detail.html?share=1&dym_plat=1&goodsId=89959&goodsType=2&for=cart';
    },
    changeDate(e) {
      const number = this.index + e;
      if (number < 0 || number > this.length) {
        // 不存在数据
        return;
      } else if (number === this.length) {
        this.apiGetList(1, this.dateList[number]);
      } else {
        // 常规数据
        this.apiGetList(1, this.dateList[number], this.dateList[number+1]);
      }
      this.index = number;
    },
  },
};
</script>
