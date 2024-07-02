<template>
  <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as ECharts from 'echarts';

export default {
  data() {
    return {
      chartInstance: null,
      dataBlue: [80, 90, 100, 110, 120, 115, 105], // 蓝色折线数据示例
      dataGray: [70, 85, 95, 100, 90, 80, 75], // 灰色折线数据示例
      categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      upperLimit: 105, // 辅助线标准值
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      this.chartInstance = ECharts.init(this.$refs.chart);

      const option = {
        xAxis: {
          type: 'category',
          data: this.categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '蓝色折线',
            type: 'line',
            data: this.dataBlue,
            color: 'blue',
            markPoint: {
              symbolSize: 10,
              data: this.dataBlue.map((value, index) => ({
                name: '',
                coord: [this.categories[index], value],
                itemStyle: {
                  color: value > this.upperLimit ? 'red' : 'blue',
                },
              })),
            },
          },
          {
            name: '灰色折线',
            type: 'line',
            data: this.dataGray,
            color: 'gray',
          },
        ],
        graphic: {
          elements: [
            {
              type: 'line',
              id: 'upperLimitLine',
              z: 100,
              silent: true,
              lineStyle: {
                color: 'rgba(0,0,0,0.5)',
                width: 1,
              },
              position: ['50%', 'top'],
              top: this.upperLimit,
            },
          ],
        },
      };

      this.chartInstance.setOption(option);
    },
    // 当数据更新时，重新设置 ECharts 选项
    updateChartData(newDataBlue, newDataGray) {
      const newOption = {
        ...this.chartInstance.getOption(),
        series: [
          {
            ...this.chartInstance.getOption().series[0],
            data: newDataBlue,
            markPoint: {
              ...this.chartInstance.getOption().series[0].markPoint,
              data: newDataBlue.map((value, index) => ({
                ...this.chartInstance.getOption().series[0].markPoint.data[index],
                itemStyle: {
                  color: value > this.upperLimit ? 'red' : 'blue',
                },
              })),
            },
          },
          {
            ...this.chartInstance.getOption().series[1],
            data: newDataGray,
          },
        ],
      };

      this.chartInstance.setOption(newOption);
    },
  },
};
</script>