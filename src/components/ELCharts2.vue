<template>  
  <div ref="chart" style="width: 600px; height: 400px;"></div>  
</template>  
  
<script>  
import * as echarts from 'echarts';  
  
export default {  
  name: 'PieChart',  
  data() {  
    return {  
      chart: null,  
      option: {  
        series: [  
          {  
            name: '访问来源',  
            type: 'pie',  
            radius: '55%',  
            data: [  
              {value: 235, name: '视频广告', itemStyle: { opacity: 1 }},  
              {value: 274, name: '联盟广告', itemStyle: { opacity: 1 }},  
              {value: 310, name: '邮件营销', itemStyle: { opacity: 1 }},  
              {value: 335, name: '直接访问', itemStyle: { opacity: 1 }},  
              {value: 400, name: '搜索引擎', itemStyle: { opacity: 1 }}  
            ],  
            emphasis: {  
              itemStyle: {  
                shadowBlur: 10,  
                shadowOffsetX: 0,  
                shadowColor: 'rgba(0, 0, 0, 0.2)'  
              }  
            },  
            selectedMode: 'single'  
          }  
        ]  
      }  
    };  
  },  
  mounted() {  
    this.initChart();  
  },  
  methods: {  
    initChart() {  
      this.chart = echarts.init(this.$refs.chart);  
      this.chart.setOption(this.option);  
  
      this.chart.on('selected', (params) => {  
        const { selectedData } = params;  
        const selectedIndex = selectedData.dataIndex;  
  
        this.option.series[0].data.forEach((item, index) => {  
          if (index === selectedIndex) {  
            // 清除选中项的透明度设置，以使用默认的emphasis样式  
            delete item.itemStyle;  
          } else {  
            // 设置其他项的透明度  
            item.itemStyle = { opacity: 0.3 };  
          }  
        });  
  
        this.chart.setOption(this.option, true); // 第二个参数为true表示不合并option  
      });  
    }  
  },  
  beforeDestroy() {  
    if (this.chart) {  
      this.chart.dispose();  
    }  
  }  
};  
</script>  
  
<style scoped>  
/* Add your styles here */  
</style>