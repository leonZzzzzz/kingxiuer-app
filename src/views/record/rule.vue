<template>
  <div class="record">
    <img src="static/img/i-states5.png" width="100%" alt="">
    <img :src="model.imageUrl" width="100%" height="40" alt="">
    <p class="title">选择形状</p>
    <ul class="select-wrap">
      <li class="select" :class="{'select--active':l.value == model.lhValue}" v-for="(l,i) in data" :key="i" @click="currentStatus(l.value)">
        {{l.key}}
      </li>
    </ul>
    <p class="title">测量时间</p>
    <group>
      <datetime v-model="model.measureTime" format="YYYY-MM-DD HH:mm" title="时间"></datetime>
    </group>
    <div class="button-fixed button-bottom">
      <div class="button-fixed__kf" @click="jumpPage()"><i class="icon i-kefu"></i>&nbsp;客服</div>
      <div class="button-fixed__save" @click="save">确定</div>
    </div>
  </div>
</template>

<script>
import { Datetime, Group } from 'vux';
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';

export default {
  components: {
    Datetime,
    Group,
  },
  data() {
    return {
      btnLoading: false,
      model: {
        type: 2,
        lhValue: 5,
        measureTime: '',
        imageUrl: '/attachments/assets/img/null.jpg',
      },
      data: [
        { key: '5', value: '5' },
        { key: '10', value: '10' },
        { key: '25', value: '25' },
        { key: '26-44', value: '26' },
        { key: '45', value: '45' },
        { key: '46-64', value: '46' },
        { key: '65', value: '65' },
        { key: '>65', value: '66' },
      ],
    };
  },
  watch: {
    btnLoading(val) {
      if (val) {
        this.$vux.loading.show({
          text: 'Loading'
        })
      } else {
        this.$vux.loading.hide()
      }
    }
  },
  computed: {
    ...mapState(['base64Img', 'formData']),
  },
  created() {
    const img = this.$route.query.url;
    if (img) {
      this.model.imageUrl = img;
    }
  },
  methods: {
    apiSaveModel(model) {
      this.btnLoading = true
      this.$http.post('/ovulate/insert.do', model)
        .then((res) => {
          console.log(res.data);
          this.btnLoading = false
          this.toast('保存成功');
          setTimeout(() => {
            this.$router.push('/list/rule');
          }, 500);
        })
        .catch(res => {
          this.btnLoading = false
          if (res.data.errCode == 3) {
            let _this = this;
            this.$vux.confirm.show({
              title: '温馨提示',
              content: res.data.errMsg,
              onCancel () {},
              onConfirm () {
                model.flag = 1
                _this.apiSaveModel(model)
              }
            })
          } 
        })
    },
    apiImgData() {
      axios.post('/attachments/images/tencent_cloud.do', this.formData)
        .then((res) => {
          this.model.imageUrl = res.data.imageUrl;
          this.apiSaveModel(this.model);
        });
    },
    currentStatus(i) {
      this.model.lhValue = i;
    },
    save() {
      if (this.btnLoading) return false
      // 验证
      if (this.model.measureTime === '') {
        this.toast('请录入时间');
        return;
      }
      // if (this.$route.query.type === 'camera') {
      //   this.apiImgData();
      // } else {
      this.apiSaveModel(this.model);
      // }
    },
    jumpPage() {
      window.location.href = 'https://www.sobot.com/chat/h5/index.html?sysNum=5794d0f83d64499fa22bac2c6e7efd0a&moduleType=3&color=fe6e7f&titleFlag=2&powered=false&groupId=352d32004a524fc9ab637f11a953ac32&customTitle=%E9%87%91%E7%A7%80%E5%84%BF';
    },
    ...mapMutations(['setFormData', 'setBase64Img']),
  },
  beforeDestroy() {
    this.$vux.loading.hide()
  },
  destroyed() {
    this.setFormData('');
    this.setBase64Img('');
  },
};
</script>

<style lang="less" scoped>
.record {
  margin-bottom: 80px;
  .img {
    height: 50px;
    width: 100%;
    display: block;
  }
  .title {
    margin: 40px 20px 10px;
  }
  .select-wrap {
    margin: 20px;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    .select {
      width: 14vw;
      padding: 10px;
      margin-bottom: 20px;
      position: relative;
      display: inline-block;
      text-align: center;
      background: #fdeef4;
      list-style: none;
      border-radius: 3px;
      border: 1px solid #fff;
    }
    .select--active {
      border: 1px solid #e9578c;
      color: #fff;
      background: #e9578c;
    }
  }
  .button-fixed {
    height: 52px;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    text-align: center;
    line-height: 52px;
    &__kf {
      width: 139px;
      background: #ffe8ec;
    }
    &__save {
      flex: 1;
      color: #fff;
      background: #e9578c;
    }
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .button-bottom {
    bottom: 34px !important;
  }
}
</style>
