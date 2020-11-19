<template>
  <div>
    <div ref="list" v-if="$route.query.type == 'normal'">
      <v-photo-normal v-for="list in list" :key="list.id" :data="list"></v-photo-normal>
    </div>
    <div ref="list" v-else>
      <v-photo-rule v-for="list in list" :key="list.id" :data="list"></v-photo-rule>
    </div>
    <div style='height:100px;'></div>
    <div class="button-fixed button-bottom">
      <div class="button-fixed__kf" @click="jumpPage()"><i class="icon i-kefu"></i>&nbsp;客服</div>
      <a class="button-fixed__save down"  @click="ondownload()"><i class="icon i-xiazai"></i>&nbsp;下载</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import html2canvas from 'html2canvas';
import VPhotoNormal from '@/components/photo/photo-normal';
import VPhotoRule from '@/components/photo/photo-rule';

export default {
  components: {
    VPhotoNormal,
    VPhotoRule,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.list = JSON.parse(localStorage.getItem('LISTDATA'));
  },
  methods: {
    ondownload() {
      this.toast('正在合成图片，请稍候');
      html2canvas(this.$refs.list, { useCORS: true, logging: false})
        .then((canvas) => {
          const u = window.navigator.userAgent;
          const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          if (isiOS) {
            const imgurl = `${canvas.toDataURL('image/jpeg', 0.5)}`;
            const formData = new FormData();
            formData.append('base64', imgurl);
            formData.append('uid', localStorage.getItem('uid'));
            formData.append('imageType', 'ovulate');
            axios.post('/attachments/images/tencent_cloud_base64.do', formData).then((res) => {
              window.location.href = `dayima://saveimage/new?url=https://kingsuer-1255600302.file.myqcloud.com/${res.data.imageUrl}`;
            });
          } else {
            canvas.toBlob((e) => {
              const formData = new FormData();
              for (const key in e) {
                  formData.append(key, e[key]);
              }
              formData.append('file', e, 'sadf.jpg');
              formData.append('uid', localStorage.getItem('uid'));
              formData.append('imageType', 'ovulate');
              axios.post('/attachments/images/tencent_cloud.do', formData).then((res) => {
                this.toast('保存中。。。');
                var img=encodeURIComponent(`https://kingsuer-1255600302.file.myqcloud.com/${res.data.imageUrl}`)
                console.log(img)
                window.location.href = `dayima://saveimage/new?url=${img}`;
              });
            }, 'image/jpeg');
          }
        });
    },
    jumpPage() {
      window.location.href = 'https://www.sobot.com/chat/h5/index.html?sysNum=5794d0f83d64499fa22bac2c6e7efd0a&moduleType=3&color=fe6e7f&titleFlag=2&powered=false&groupId=352d32004a524fc9ab637f11a953ac32&customTitle=%E9%87%91%E7%A7%80%E5%84%BF';
    },
  },
};
</script>

<style lang="less" scoped>
.modelcon {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 888;
}
.tips {
  position: fixed;
  bottom: 9%;
  color: #000;
  text-align: center;
  font-size: 16px;
  background: #fff;
  width: 80%;
  left: 10%;
  padding: 10px 0;
  border-radius: 5px;
  margin-top: 5px;
}
.delmodel {
  position: fixed;
  bottom: 5%;
  color: #fff;
  text-align: center;
  width: 100%;
  left: 0;
  font-size: 16px;
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
    width: 50%;
    background: #ffe8ec;
  }
  &__save {
    width: 50%;
    color: #fff;
    background: #e9578c;
  }
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .button-bottom {
    bottom: 34px !important;
  }
}
</style>