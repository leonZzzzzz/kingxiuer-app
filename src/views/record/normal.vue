<template>
  <div class="record">
    <!-- <img :src="base64Img" width="100%" alt=""> -->
    <img class="img" :src="model.imageUrl" width="100%" height="40" alt="">
    <p class="title">选择形状</p>
    <ul class="select-wrap">
      <li class="select" :class="{'select--active':i == model.lhValue}" v-for="(l,i) in 5" :key="i" @click="currentStatus(i)">
        <span class="label">{{i | statusName}}</span>
        <img :src="`static/img/i-states${i}.jpg`" width="100%" alt="">
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
        type: 1,
        lhValue: 0,
        measureTime: '',
        imageUrl: '/attachments/assets/img/null.jpg',
      },
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
            this.$router.push('/list/normal');
          }, 1000);
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
  .img {
    height: 50px;
    width: 100%;
    display: block;
  }
  margin-bottom: 80px;
  .title {
    margin: 40px 20px 10px;
  }
  .select-wrap {
    .select {
      list-style: none;
      margin: 20px;
      position: relative;
      border: 1px solid #fff;
      .label {
        height: 100%;
        width: 60px;
        position: absolute;
        left: 0;
        font-size: 14px;
        text-align: center;
        line-height: 24px;
        color: #6b6b6b;
        background: #ffe7ed;
      }
      img {
        display: block;
      }
    }
    .select--active {
      border: 1px solid #de538c;
      .label {
        color: #fff;
        background: #de538c;
      }
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
