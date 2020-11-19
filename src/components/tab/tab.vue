<template>
  <div class="hander">
    <div class="float-btn buy" v-if="$route.path == '/list/normal'" @click="jumpPage('https://ibuy.meiyue.com/h5/product/new/detail.html?share=1&dym_plat=1&goodsId=89959&goodsType=2&for=cart')"><i class="icon i-car"></i></div>
    <div class="float-btn buy" v-if="$route.path == '/list/rule'" @click="jumpPage('https://ibuy.meiyue.com/h5/product/new/detail.html?share=1&dym_plat=1&goodsId=89785&goodsType=2&for=cart')"><i class="icon i-car"></i></div>
    <div class="float-btn kf" @click="jumpPage('https://www.sobot.com/chat/h5/index.html?sysNum=5794d0f83d64499fa22bac2c6e7efd0a&moduleType=3&color=fe6e7f&titleFlag=2&powered=false&groupId=352d32004a524fc9ab637f11a953ac32&customTitle=%E9%87%91%E7%A7%80%E5%84%BF')"><i class="icon i-kefu"></i></div>
    <div class="tab">
      <div class="tabbar" :class="{'tabbar--active': $route.path == '/list/normal'|| $route.path == '/chart/normal' }" @click="onChangeTabbar(0)">普通</div>
      <div class="tabbar" :class="{'tabbar--active': $route.path == '/list/rule'|| $route.path == '/chart/rule' }" @click="onChangeTabbar(1)">半定量</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VTab',
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    onChangeTabbar(index) {
      this.index = index;
      this.$emit('onTabChange', index);
    },
    jumpPage(url) {
      location.href = url;
    },
  },
};
</script>

<style lang="less" scoped>
.hander {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #fafafb;
  z-index: 100000;
  .float-btn {
    position: absolute;
    top: 12px;
    .icon {
      font-size: 20px;
      color: #e9578b;
    }
    &.kf {
      right: 10px;
    }
    &.buy {
      left: 10px;
    }
  }
  .tab {
    height: 50px;
    padding: 0 88px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
    box-sizing: border-box;
    .tabbar {
      position: relative;
    }
    .tabbar--active {
      color: #e9578b;
      &::after {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -14px;
        left: 0;
        background: #e9578b;
      }
    }
  }
}
</style>
