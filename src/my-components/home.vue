<template>
  <el-card class="box-card">
    <div class="clearfix" slot="header">
      <span>柱状图</span>
    </div>
    <h1 :model="msg"></h1>
  </el-card>
</template>
<script>  // echarts相关
export default {
  name: 'home',
  data () {
    return {
      'msg': 'shouye'
    }
  }
}
</script>

