<template>
  <el-dialog
    v-loading="loading"
    :title="title"
    @opened="handleQuery"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="80%"
  >
    <el-form :model="faultForm" ref="faultForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="故障系统"
            prop="sysName"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入故障系统', trigger: 'change'},
            ]"
          >
            <el-input v-model="faultForm.sysName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="故障标题"
            prop="title"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入故障标题', trigger: 'change'},
            ]"
          >
            <el-input v-model="faultForm.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="故障链接"
            prop="link"
            :label-width="formLabelWidth"
          >
            <el-input v-model="faultForm.link"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="故障描述"
            prop="desc"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入故障描述', trigger: 'change'},
            ]"
          >
            <el-input v-model="faultForm.desc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="问题责任人"
            prop="dutyR"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入问题责任人', trigger: 'change'},
            ]"
          >
            <el-input v-model="faultForm.dutyR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="问题处理人"
            prop="dealR"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入问题处理人', trigger: 'change'},
            ]"
          >
            <el-input v-model="faultForm.dealR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="问题发生时间"
            prop="occurDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入问题发生时间', trigger: 'change'},
            ]"
          >
            <el-date-picker
              v-model="faultForm.occurDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="问题解决时间"
            prop="resolveDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入问题解决时间', trigger: 'change'},
            ]"
          >
            <el-date-picker
              v-model="faultForm.resolveDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('faultForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { api } from '@/common/api'
  export default {
    name: 'FaultDialog',
    data() {
      return {
        faultForm: this.initFrom(),
        formLabelWidth: '120px',
        loading: false
      };
    },
    methods: {
      initFrom() {
        return {
          sysName: '',
          title: '',
          link: '',
          desc: '',
          dutyR: '',
          dealR: '',
          occurDate: '',
          resolveDate: '',
        }
      },

      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitForm()
          } else {
            return false;
          }
        });
      },

      handleQuery() {
        if (!this.currentId) return false
        api.get('/api/fault/queryById', {
          params: {
            id: this.currentId,
          },
        }).then((res) => {
          this.faultForm = res.data || {};
        })
      },

      submitForm() {
        this.loading = true;
        let statusTxt = '新建'
        let submitUrl = '/api/fault/create'
        if (this.currentId && this.type === 'modify') {
          statusTxt = '修改'
          submitUrl = '/api/fault/update'
        }
        console.log(this.type)
        if (this.type === 'copy') {
          delete this.faultForm._id
        }
        api.post(submitUrl, this.faultForm)
        .then(() => {
          this.loading = false;
          this.resetForm('faultForm')
          this.$notify({
            title: '成功',
            message: `${statusTxt}成功`,
            type: 'success',
            duration: 500,
          });
          setTimeout(() => {
            this.hideDialog()
            this.$emit('handleSearch')
          }, 500);
        })
        .catch(() => {
          this.loading = false;
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      hideDialog() {
        this.$emit('hideDialog')
        this.resetForm('faultForm')
        this.faultForm = this.initFrom()
      }
    },
    props: {
      dialogFormVisible: {
        type: Boolean,
        default: false
      },
      currentId: String,
      title: String,
      type: String
    }
  }
</script>

<style lang="stylus" scoped>
  .el-date-editor.el-input
    width 100%
  .el-input-number
    width 100%
</style>
