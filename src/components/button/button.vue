<template>
  <button class="button" @click="onClick">
    <i class="icon" :class="icon"></i>
    <p class="button__text">
      <slot></slot>
    </p>
  </button>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    icon: String,
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="less">
.button {
  padding: 0;
  position: relative;
  text-align: center;
  outline: none;
  border:none;
  border-radius: none;
  background: none;
  .icon {
    width: 50px;
    height: 50px;
    display: block;
    font-size: 24px;
    line-height: 50px;
    border-radius: 50%;
    color: #fff;
    background: #e9578c;
  }
  .button__text {
    font-size: 14px;
    margin: 10px auto 0;
    color: #6d6565;
  }
}
</style>
