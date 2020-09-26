<template>
  <div class="analyzeList-container">
    <div class="filter-content">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="测试人员" v-model="formData.testR"></el-input>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="formData.onlineDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="上线开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>
      <div class="btn-box">
        <el-button type="primary" @click="handleSearch"><i class="el-icon-search" /> 查询</el-button>
        <el-button @click="resetForm"><i class="el-icon-refresh" /> 重置</el-button>
      </div>
    </div>
    <div class="chart-content">
      <v-chart :options="versionBar"/>
      <v-chart :options="durationBar"/>
      <v-chart :options="bugPie"/>
    </div>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts'
  import { api } from '@/common/api'

  export default {
    name: 'AnalyzeList',
    data () {
      return {
        chartData: [],
        formData: this.initForm(),
        loading: false,
      }
    },
    computed: {
      versionBar() {
        const categoryList = this.chartData.map(item => {
          return item.testR
        })
        const versionCount = this.chartData.map(item => {
          return item.versionCount
        })
        return {
          color: ['#3398DB'],
          title: {
              left: 'center',
              text: '人员版本信息统计',
          },
          xAxis: {
              type: 'category',
              name: '测试人员',
              data: categoryList || [],
          },
          yAxis: {
              type: 'value',
              name: '版本数(个)',
          },
          series: [{
              data: versionCount || [],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
              }
          }]
        }
      },
      durationBar() {
        const categoryList = this.chartData.map(item => {
          return item.testR
        })
        const testPd = this.chartData.map(item => {
          return item.testPd
        })
        return {
          color: ['#3398DB'],
          title: {
              left: 'center',
              text: '人员测试时长信息统计',
          },
          xAxis: {
              type: 'category',
              name: '测试人员',
              data: categoryList || [],
          },
          yAxis: {
              type: 'value',
              name: '测试天数(天)',
          },
          series: [{
              data: testPd || [],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
              }
          }]
        }
      },
      bugPie() {
        const categoryList = this.chartData.map(item => {
          return item.testR
        })
        const bugCount = this.chartData.map(item => {
          return {
            value: item.versionCount,
            name: item.testR,
          }
        })
        return {
          title: {
              left: 'center',
              text: '人员Bug信息统计',
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              right: 10,
              data: categoryList
          },
          series: [
              {
                  name: 'Bug数量',
                  type: 'pie',
                  // radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  // label: {
                  //     show: false,
                  //     position: 'center'
                  // },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '30',
                          fontWeight: 'bold'
                      }
                  },
                  // labelLine: {
                  //     show: false
                  // },
                  data: bugCount
              }
          ]
        }
      },
    },
    components: {
      'v-chart': ECharts,
    },
    methods: {
      initForm() {
        return {
          testR: '',
          onlineDate: '',
        }
      },
      resetForm() {
        this.formData = this.initForm()
        this.handleSearch()
      },
      handleSearch() {
        this.loading = true
        const { testR, onlineDate} = this.formData
        const ajaxData = {
          testR,
          startDate: onlineDate[0],
          endDate: onlineDate[1],
        }
        api.get('/api/demand/summary', {
          params: ajaxData,
        })
        .then((res) => {
          this.loading = false;
          this.chartData = res.data || [];

        })
        .catch(() => {
          this.loading = false;
        });
      },
    },
    created() {
      this.handleSearch()
    },
  }
</script>

<style lang="stylus" scoped>
  .analyzeList-container
    padding 24px 24px 0
    .filter-content
      background-color white
      padding 20px
      border-radius 8px
      .btn-box
        margin-top 20px
        .export
          display inline-block
          margin 0 10px
      .el-range-editor.el-input__inner
        width 100%
    .chart-content
      background-color white
      border-radius 8px
      margin-top 25px
      padding 20px
      display flex
      flex-wrap wrap
      .echarts
        width 50%
        height 400px
</style>