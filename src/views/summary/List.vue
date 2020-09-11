<template>
  <div class="summaryList-container">
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
    <div class="table-content">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="testR"
          label="测试人员"
        >
        </el-table-column>
        <el-table-column
          prop="versionCount"
          label="版本数"
        >
        </el-table-column>
        <el-table-column
          prop="bugCount"
          label="Bug数"
        >
        </el-table-column>
        <el-table-column
          prop="developPd"
          label="开发天数"
        >
        </el-table-column>
        <el-table-column
          prop="testPd"
          label="测试时长"
        >
        </el-table-column>
        <el-table-column
          prop="caseCount"
          label="用例数"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { api } from '@/common/api'

  export default {
    name: 'SummaryList',
    data () {
      return {
        tableData: [],
        formData: this.initForm(),
        loading: false,
      }
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
          this.tableData = res.data || [];
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
  .summaryList-container
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
    .table-content
      background-color white
      border-radius 8px
      margin-top 25px
      .demand-link
        color #409EFF
        text-decoration none
      .btn-wrap
        width 200px
      .pageBox
        padding 15px
        text-align right
</style>