<template>
  <swipeout v-if="true">
    <swipeout-item transition-mode="follow">
      <div slot="right-menu">
        <swipeout-button @click.native="onDelete(data.id)" type="warn">删除</swipeout-button>
      </div>
      <div slot="content" class="demo-content vux-1px-t">
        <div class="photo">
          <div class="photo__date">{{data.yyyy}}<br>{{data.mm}}</div>
          <div class="photo__content">
            <div class="afh afh--time">{{data.time}}</div>
            <img :src="data.imageUrl" width="100%" height="100%" alt="">
            <div class="afh afh--value" :class="{
              'afh--0': data.lhValue == 0,
              'afh--1': data.lhValue == 1,
              'afh--2': data.lhValue == 2,
              'afh--3': data.lhValue == 3,
              'afh--4': data.lhValue == 4}">
              {{data.lhValue | statusName}}
            </div>
          </div>
        </div>
      </div>
    </swipeout-item>
  </swipeout>
  
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';

export default {
  props: {
    data: Object,
  },
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
  },
  methods: {
    onDelete(e) {
      this.$emit('delete', e);
    },
  },
};
</script>

<style lang="less">
.photo {
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid #fff;
  &__date {
    flex: 50px 0 0;
    font-size: 11px;
    color: #d0d0d0;
    text-align: center;
    box-sizing: border-box;
  }
  &__content {
    flex: 1;
    height: 44px;
    position: relative;
    .afh {
      width: 56px;
      height: 44px;
      line-height: 44px;
      position: absolute;
      top: 0;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
    .afh--time {
      background: rgba(165, 165, 162, 0.69);
    }
    .afh--value {
      right: 0;
    }
    .afh--0 {
      background-color: rgba(0, 0, 0, 0.45);
    }
    .afh--1 {
      background-color: rgba(0, 0, 0, 0.45);
    }
    .afh--2 {
      background-color: rgba(190, 52, 214, 0.46);
      }
    .afh--3 {
      background-color: rgba(190, 52, 214, 0.46);
    }
    .afh--4 {
      background-color: rgba(81, 0, 103, 0.78);
    }
  }
}
</style>
