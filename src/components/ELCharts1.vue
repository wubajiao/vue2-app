<!--
 * @Descripttion : 
 * @Author       : wuhaidong
 * @Date         : 2024-03-27 15:26:16
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-27 15:26:58
-->
<template>
  <div>
    <div ref="chart1" style="width: 400px; height: 400px;"></div>
    <div ref="chart2" style="width: 400px; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      chart1: null,
      chart2: null,
      data1: {
        data: [
          { name: 'A', value: 10 },
          { name: 'B', value: 20 },
          { name: 'C', value: 30 }
        ]
      },
      data2: {
        data: [
          { name: 'A', value: 10 },
          { name: 'B', value: 20 },
          { name: 'C', value: 30 }
        ]
      }
    };
  },
  mounted() {
    this.chart1 = echarts.init(this.$refs.chart1);
    this.chart2 = echarts.init(this.$refs.chart2);

    this.renderChart1();
    this.renderChart2();

    this.chart1.on('click', (params) => {
      this.data2.data = [params.data];
      this.renderChart2();
    });

    this.chart2.on('click', (params) => {
      this.data1.data = [params.data];
      this.renderChart1();
    });
  },
  methods: {
    renderChart1() {
      this.chart1.setOption({
        series: [{
          type: 'pie',
          data: this.data1.data,
          emphasis: {
            focus: 'data'
          }
        }]
      });
    },
    renderChart2() {
      this.chart2.setOption({
        series: [{
          type: 'pie',
          data: this.data2.data,
          emphasis: {
            focus: 'data'
          }
        }]
      });
    }
  }
};
</script>
