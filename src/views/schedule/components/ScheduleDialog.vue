<template>
  <el-dialog
    v-loading="loading"
    title="新增排期"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="40%"
  >
    <el-form :model="scheduleForm" ref="scheduleForm">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item
            label="需求名称"
            prop="name"
            :label-width="formLabelWidth"
            :rules="[
              {required: true, message: '请输入需求名称', trigger: 'change'},
            ]"
          >
            <el-input v-model="scheduleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="负责人"
            prop="planR"
            :label-width="formLabelWidth"
            :rules="[
              {required: true, message: '请输入负责人名称', trigger: 'change'},
            ]"
          >
            <el-input v-model="scheduleForm.planR"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('scheduleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { api } from '@/common/api'
  export default {
    name: 'ScheduleDialog',
    data() {
      return {
        scheduleForm: this.initFrom(),
        formLabelWidth: '120px',
        loading: false
      };
    },
    methods: {
      initFrom() {
        return {
          name: '',
          planR: '',
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

      submitForm() {
        this.loading = true;
        let statusTxt = '新建'
        let submitUrl = '/api/schedule/create'
        const formData = {
          planDate: this.current,
          ...this.scheduleForm,
        }
        api.post(submitUrl, formData)
        .then(data => {
          this.loading = false;
          if (data.code === 200) {
            this.resetForm('scheduleForm')
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
          } else {
            const schedule = data.data[0]
            this.$alert(`当前日期下【${schedule.planR}】已有排期任务：${schedule.name}`, '排期冲突')
          }
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
        this.resetForm('scheduleForm')
        this.scheduleForm = this.initFrom()
      }
    },
    props: {
      dialogFormVisible: {
        type: Boolean,
        default: false
      },
      current: {
        type: String,
        default: '',
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .el-date-editor.el-input
    width 100%
  .el-input-number
    width 100%
</style>
