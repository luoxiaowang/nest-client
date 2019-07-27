<!--
 * @Author: luoxiao
 * @Date: 2019-07-27 15:15:32
 * @LastEditors: luoxiao
 * @LastEditTime: 2019-07-27 17:19:01
 * @Description: file content
 -->

<template>
  <div class="demandList-container">
    <div class="filter-content">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="需求名称" v-model="formData.name"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="测试主R" v-model="formData.testPerson"></el-input>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="formData.createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>
      <div class="btn-box">
        <el-button type="primary"><i class="el-icon-search" /> 查询</el-button>
        <el-button><i class="el-icon-refresh" /> 重置</el-button>
        <el-button type="warning"><i class="el-icon-download" /> 导出</el-button>
        <el-button type="success" @click="showDialog"><i class="el-icon-plus" /> 新建需求</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="需求名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="需求主R"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="开发主R"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="测试主R"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="计划提测日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="province"
          label="实际提测日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="city"
          label="开发估时"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="测试估时"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="测试人效"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <DemandDialog
      :dialogFormVisible="dialogFormVisible"
      @hideDialog="hideDialog"
    />
  </div>
</template>

<script>
  import DemandDialog from './components/DemandDialog'

  export default {
    name: 'DemandList',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '上海市普陀区金沙江路 1518 弄',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '上海市普陀区金沙江路 1518 弄',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }],
        formData: {
          name: '',
          testPerson: '',
          createDate: ''
        },
        currentPage: 1,
        dialogFormVisible: false,
      };
    },
    components: {
      DemandDialog,
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      showDialog() {
        this.dialogFormVisible = true
      },
      hideDialog() {
        console.log('dddddd')
        this.dialogFormVisible = false
      },
      handleClick() {
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .demandList-container
    padding 24px 24px 0
    .filter-content
      background-color white
      padding 20px
      border-radius 8px
      .btn-box
        margin-top 20px
      .el-range-editor.el-input__inner
        width 100%
    .table-content
      background-color white
      border-radius 8px
      margin-top 25px
      .pageBox
        padding 15px
        text-align right
</style>
