<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>同环比计算</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="resetRate">重置</el-button>
    </div>
    <div class="text item">
      <div>
        <el-input v-model="currentSamePeriod" placeholder="当前周期"></el-input>
        <el-input v-model="sameRate" placeholder="同比周期"></el-input>
        <el-button type="primary" @click="handleSameRateCalc">计算同比</el-button>
        <el-input v-model="sameRateResult" readonly placeholder="结果"></el-input>
      </div>
      <div class="section">
        <el-input v-model="currentCiclePeriod" placeholder="当前周期"></el-input>
        <el-input v-model="cicleRate" placeholder="环比周期"></el-input>
        <el-button type="primary" @click="handleCicleRateCalc">计算环比</el-button>
        <el-input v-model="cicleRateResult" readonly placeholder="结果"></el-input>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'RateCalc',
  data () {
    return {
      currentSamePeriod: '',
      sameRate: '',
      sameRateResult: '',
      currentCiclePeriod: '',
      cicleRate: '',
      cicleRateResult: '',
    }
  },
  methods: {
    handleSameRateCalc() {
      const result = ((this.currentSamePeriod - this.sameRate) / this.sameRate).toFixed(4) * 100 + '%'
      this.sameRateResult = result
    },
    handleCicleRateCalc() {
      const result = ((this.currentCiclePeriod - this.cicleRate) / this.cicleRate).toFixed(4) * 100 + '%'
      this.cicleRateResult = result
    },
    resetRate() {
      this.currentSamePeriod = ''
      this.sameRate = ''
      this.sameRateResult = ''
      this.currentCiclePeriod = ''
      this.cicleRate = ''
      this.cicleRateResult = ''
    }
  },
}
</script>

<style lang="stylus" scoped>
  .box-card
    .el-input
      width 210px
      margin-right 20px
    .el-button
      margin-right 20px
    .section
      margin-top 20px
</style>
