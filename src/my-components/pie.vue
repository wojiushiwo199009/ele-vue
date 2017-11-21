<template>
  <el-card class="box-card">
    <div class="clearfix" slot="header">
      <span>饼图</span>
    </div>
    <div class="charts">
      <div id="myChart" :style="{width:'300px',height:'300px'}"></div>
    </div>
  </el-card>
</template>
<script>  // echarts相关
import echarts from 'echarts'
export default {
  name: 'chart-pie',
  data () {
    return {}
  },
  mounted () {
    let myChart = echarts.init(document.getElementById('myChart'))
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    myChart.setOption(option)
  }
}
</script>

