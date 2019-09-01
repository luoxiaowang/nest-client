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
    <el-form :model="demandForm" ref="demandForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="需求名称"
            prop="name"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入需求名称', trigger: 'change'},
            ]"
          >
            <el-input v-model="demandForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="需求链接"
            prop="link"
            :label-width="formLabelWidth"
          >
            <el-input v-model="demandForm.link"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="需求主R"
            prop="demandR"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入需求主R姓名', trigger: 'change'},
            ]"
          >
            <el-input v-model="demandForm.demandR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开发主R"
            prop="developR"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入开发主R姓名', trigger: 'change'},
            ]"
          >
            <el-input v-model="demandForm.developR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="测试主R"
            prop="testR"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入测试主R姓名', trigger: 'change'},
            ]"
          >
            <el-input v-model="demandForm.testR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计划提测时间"
            prop="planDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入计划提测时间', trigger: 'change'},
            ]"
          >
            <el-date-picker
              v-model="demandForm.planDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="实际提测时间"
            prop="actualDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入实际提测时间', trigger: 'change'},
            ]"
          >
            <el-date-picker
              v-model="demandForm.actualDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计划上线日期"
            prop="planOnlineDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入计划上线日期', trigger: 'change'},
            ]"
          >
            <el-date-picker
              v-model="demandForm.planOnlineDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="实际上线日期"
            prop="actualOnlineDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入实际上线日期', trigger: 'change'},
            ]"
          >
            <el-date-picker
              v-model="demandForm.actualOnlineDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开发估时"
            prop="developPd"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入开发估时', trigger: 'change'},
            ]"
          >
            <el-input-number controls-position="right" :step="0.1" :min="0.1" v-model="demandForm.developPd"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="测试估时"
            prop="testPd"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入测试估时', trigger: 'change'},
            ]"
          >
            <el-input-number controls-position="right" :step="0.1" :min="0.1" v-model="demandForm.testPd"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="测试人效"
            prop="testPw"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入测试人效', trigger: 'change'},
            ]"
          >
            <el-input-number controls-position="right"  :step="0.1" :min="0.1" v-model="demandForm.testPw"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('demandForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { api } from '@/common/api'
  export default {
    name: 'DemandDialog',
    data() {
      return {
        demandForm: this.initFrom(),
        formLabelWidth: '120px',
        loading: false
      };
    },
    methods: {
      initFrom() {
        return {
          name: '',
          link: '',
          demandR: '',
          developR: '',
          testR: '',
          planDate: '',
          actualDate: '',
          developPd: '',
          testPd: '',
          testPw: ''
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
        api.get('/api/demand/queryById', {
          params: {
            id: this.currentId,
          },
        }).then((res) => {
          this.demandForm = res.data || {};
          console.log(this.demandForm)
        })
      },

      submitForm() {
        this.loading = true;
        let statusTxt = '新建'
        let submitUrl = '/api/demand/create'
        if (this.currentId && this.type === 'modify') {
          statusTxt = '修改'
          submitUrl = '/api/demand/update'
        }
        console.log(this.type)
        if (this.type === 'copy') {
          delete this.demandForm._id
        }
        api.post(submitUrl, this.demandForm)
        .then(() => {
          this.loading = false;
          this.resetForm('demandForm')
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
        this.resetForm('demandForm')
        this.demandForm = this.initFrom()
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
