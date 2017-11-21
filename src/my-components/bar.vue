<template>
  <el-card class="box-card">
    <div class="clearfix" slot="header">
      <span>柱状图</span>
    </div>
    <div class="charts">
      <div id="myChart" :style="{width:'300px',height:'300px'}"></div>
    </div>
  </el-card>
</template>
<script>  // echarts相关
import echarts from 'echarts'
export default {
  name: 'chart-bar',
  data () {
    return {}
  },
  mounted () {
    let myChart = echarts.init(document.getElementById('myChart'))
    // 指定图表的配置项和数据
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>

