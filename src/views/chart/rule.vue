<template>
  <div v-if="type == 0" class="chart">
    <div class="date">
      <i class="icon i-left" :class="{ 'no' : index === 0 }" @click="changeDate(-1)"></i>
      {{dateList[index]}}
      <i
        class="icon i-right"
        :class="{ 'no' : index === length }"
        @click="changeDate(1)"
      ></i>
    </div>
    <div class="lists">
      <div id="main" style="height:300px"></div>
      <i class="icon i-right2" @click="jumpPage('/chart/rule')"></i>
    </div>
    <section class="button-group">
      <v-button icon="i-order" @click="jumpPage('/chart/rule')">试纸列表</v-button>
      <v-button icon="i-pic" @click="chooseImage">拍照记录</v-button>
      <v-button icon="i-jilu" @click="jumpPage('/record/rule')">手动记录</v-button>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import Echarts from "echarts";
import VButton from "@/components/button/button";
import VPhotoRule from "@/components/photo/photo-rule";
import list from "../../mixin/list";

export default {
  mixins: [list],
  components: {
    VButton,
    VPhotoRule
  },
  data() {
    return {
      type: 0,
      list: [],
      dateList: [],
      index: 0,
      length: 0
    };
  },
  created() {
    window.set_pic = this.set_pic;
    this.apiGetCycle().then(res => {
      this.dateList = res.data.content0.rows;
      this.index = this.dateList.length - 1;
      this.length = this.dateList.length - 1;
      this.apiGetLine(2, this.dateList[this.index]);
    });
  },
  methods: {
    initChart(d1, d2, d3, time) {
      const myChart = Echarts.init(document.getElementById("main"));
      myChart.setOption({
        grid: {
          top: "15%",
          left: "10%",
          width: "80%",
          height: "58%"
        },
        xAxis: {
          axisLabel: {
            color: "#000"
          },
          axisLine: {
            lineStyle: {
              color: "#f5cbd5"
            }
          },
          axisTick: {
            inside: true,
            alignWithLabel: true
          },
          data: time
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 70,
          type: "value"
        },
        legend: {
          data: [
            { name: "安全期", icon: "circle" },
            { name: "易孕期", icon: "circle" },
            { name: "排卵日", icon: "circle" }
          ]
        },
        dataZoom: {
          type: "inside",
          start: 0,
          end: 100
        },
        series: [
          {
            symbolSize: 11,
            name: "安全期",
            type: "line",
            itemStyle: {
              normal: {
                color: "#4baefe"
              }
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ],
              symbol: "roundRect",
              symbolSize: [25, 20],
              symbolOffset: [0, -20]
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#389cf0" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff" // 100% 处的颜色
                  }
                ]
              }
            },
            data: d1
          },
          {
            symbolSize: 11,
            name: "易孕期",
            type: "line",
            itemStyle: {
              normal: {
                color: "#d2a6f4"
              }
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ],
              symbol: "roundRect",
              symbolSize: [25, 20],
              symbolOffset: [0, -20]
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#bc81ec" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff" // 100% 处的颜色
                  }
                ]
              }
            },
            data: d2
          },
          {
            symbolSize: 11,
            name: "排卵日",
            type: "line",
            itemStyle: {
              normal: {
                color: "#8106a2"
              }
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ],
              symbol: "roundRect",
              symbolSize: [25, 20],
              symbolOffset: [0, -20]
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#8000a1" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff" // 100% 处的颜色
                  }
                ]
              }
            },
            data: d3
          }
        ]
      });
    },
    apiGetCycle() {
      return this.$http.get("/ovulate/getCycle.do");
    },
    apiGetLine(type, start, end) {
      this.$http
        .get("/ovulate/getLine.do", { type: 2, start, end })
        .then(res => {
          const data = res.data.content0;
          // eslint-disable-next-line
          const time = data.time_line.map(time => {
            return time.substr(5, time.length - 1).replace(/\s/g, "\n");
          });
          this.initChart(
            data.safe_line,
            data.ovulate_line,
            data.ovulateday_line,
            time
          );
        });
    },
    apiDelete(id) {
      this.$http.post("/ovulate/delete.do", { id }).then(() => {
        this.apiGetList(2, this.dateList[this.index]);
      });
    },
    jumpPage(url) {
      this.$router.push(url);
    },
    chooseImage() {
      window.location.href = "dayima://takephotofortestpaper/new";
      // const d = e.target.files[0];
      // lrz(file)
      //   .then((rst) => {
      //     rst.formData.append('name', 'file');
      //     rst.formData.append('uid', localStorage.getItem('uid'));
      //     rst.formData.append('imageType', 'ovulate');
      //     this.$store.commit('setFormData', rst.formData);
      //     this.$store.commit('setBase64Img', rst.base64);
      //     this.$router.push('/record/rule?type=camera');
      //   });
    },
    changeDate(e) {
      const number = this.index + e;
      if (number < 0 || number > this.length) {
        // 不存在数据
        this.toast("没有数据了");
        return;
      } else if (number === this.length) {
        // 表示最后一个数据了
        console.log("表示最后一个数据了");
        if (this.type === 0) {
          this.apiGetLine(2, this.dateList[number]);
        } else {
          this.apiGetList(2, this.dateList[number]);
        }
      } else {
        // 常规数据
        console.log("常规数据");
        if (this.type === 0) {
          this.apiGetLine(2, this.dateList[number], this.dateList[number + 1]);
        } else {
          this.apiGetList(2, this.dateList[number], this.dateList[number + 1]);
        }
      }
      this.index = number;
    },
    set_pic(url) {
      var img = JSON.parse(url).pic[0];
      this.$router.push("/record/rule?type=camera&url=" + img);
    }
  }
};
</script>
