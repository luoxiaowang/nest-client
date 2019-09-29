<!--
 * @Author: luoxiao
 * @Date: 2019-07-27 15:15:32
 * @LastEditors: luoxiao
 * @LastEditTime: 2019-07-30 22:30:38
 * @Description: file content
 -->

<template>
  <div class="faultList-container">
    <div class="filter-content">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="责任人" v-model="formData.dutyR"></el-input>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="formData.actualDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>
      <div class="btn-box">
        <el-button type="primary" @click="handleSearch(1)"><i class="el-icon-search" /> 查询</el-button>
        <el-button @click="resetForm"><i class="el-icon-refresh" /> 重置</el-button>
        <el-button type="warning"><i class="el-icon-download" /> 导出</el-button>
        <el-button type="success" @click="handleAdd"><i class="el-icon-plus" /> 录入故障</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%">
        <el-table-column
          prop="sysName"
          label="故障系统"
          width="200">
        </el-table-column>
        <el-table-column
          label="故障标题"
          width="200">
          <template slot-scope="scope">
            <a target="_blank" class="fault-link" v-if="scope.row.link" :href="scope.row.link">{{scope.row.title}}</a>
            <span v-else>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="故障描述"
          width="200">
        </el-table-column>
        <el-table-column
          prop="occurDate"
          label="问题发生时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="resolveDate"
          label="问题解决时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="dutyR"
          label="问题责任人"
          width="200">
        </el-table-column>
        <el-table-column
          prop="dealR"
          label="问题处理人"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="180"
          label="操作">
            <template slot-scope="scope">
              <div class="btn-wrap">
                <el-button type="text" size="small" @click="handleCopy(scope.row)"><i class="el-icon-document-copy"></i> 复制</el-button>
                <el-button type="text" size="small" @click="handleModify(scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
                <el-button type="text" size="small" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
              </div>
            </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <FaultDialog
      :dialogFormVisible="dialogFormVisible"
      :currentId="currentId"
      :title="dialogTitle"
      :type="dialogType"
      @hideDialog="hideDialog"
      @handleSearch="handleSearch"
    />
  </div>
</template>

<script>
  import FaultDialog from './components/FaultDialog'
  import { api } from '@/common/api'

  export default {
    name: 'FaultList',
    data() {
      return {
        tableData: [],
        formData: this.initForm(),
        currentPage: 1,
        pageSize: 10,
        total: 0,
        dialogFormVisible: false,
        loading: false,
        currentId: '',
        dialogTitle: '新建需求',
        dialogType: 'add',
      };
    },
    components: {
      FaultDialog,
    },
    methods: {
      initForm() {
        return {
          dutyR: '',
          actualDate: '',
        }
      },

      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 1
        this.handleSearch()
      },

      handleCurrentChange(val) {
        this.currentPage = val
        this.handleSearch()
      },

      showDialog() {
        this.dialogFormVisible = true
      },

      hideDialog() {
        this.dialogFormVisible = false
        this.currentId = null
      },

      resetForm() {
        this.formData = this.initForm()
        this.currentPage = 1
        this.handleSearch()
      },

      handleSearch(currentPage) {
        if (currentPage) {
          this.currentPage = currentPage
        }
        this.loading = true;
        const { dutyR, actualDate} = this.formData
        const ajaxData = {
          dutyR,
          startDate: actualDate[0],
          endDate: actualDate[1],
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
        api.get('/api/fault', {
          params: ajaxData,
        })
        .then((res) => {
          this.loading = false;
          this.total = res.total;
          this.tableData = res.data || [];
        })
        .catch(() => {
          this.loading = false;
        });
      },

      handleAdd() {
        this.dialogTitle = '录入故障'
        this.dialogType = 'add'
        this.showDialog()
      },

      handleCopy(item) {
        this.dialogTitle = '录入故障'
        this.currentId = item._id
        this.dialogType = 'copy'
        this.showDialog()
      },

      handleModify(item) {
        this.dialogTitle = '编辑故障'
        this.currentId = item._id
        this.dialogType = 'modify'
        this.showDialog()
      },

      handleDelete(item) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteData(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      deleteData(item) {
        api.get('/api/fault/delete', {
          params: {
            id: item._id
          },
        })
        .then((res) => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 500,
          });
          this.handleSearch()
        })
        .catch(() => {
          this.$notify.error({
            title: '错误',
            message: '删除失败'
          });
        });
      }
    },
    created() {
      this.handleSearch()
    },
  }
</script>

<style lang="stylus" scoped>
  .faultList-container
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
      .fault-link
        color #409EFF
        text-decoration none
      .btn-wrap
        width 200px
      .pageBox
        padding 15px
        text-align right
</style>
