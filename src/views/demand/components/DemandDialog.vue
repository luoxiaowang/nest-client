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
            label="产品人员"
            prop="demandR"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入产品人员姓名', trigger: 'change'},
            ]"
          >
            <el-input v-model="demandForm.demandR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开发人员"
            prop="developR"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入开发人员姓名', trigger: 'change'},
            ]"
          >
            <el-input v-model="demandForm.developR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="测试人员"
            prop="testR"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入测试人员姓名', trigger: 'change'},
            ]"
          >
            <el-input v-model="demandForm.testR"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="提测日期"
            prop="actualDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入提测日期', trigger: 'change'},
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
            label="UAT日期"
            prop="uatDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入UAT日期', trigger: 'change'},
            ]"
          >
            <el-date-picker
              v-model="demandForm.uatDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="上线日期"
            prop="actualOnlineDate"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入上线日期', trigger: 'change'},
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
            label="测试时间"
            prop="testPeriod"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入测试时间', trigger: 'change'},
            ]"
          >
            <el-date-picker
              v-model="demandForm.testPeriod"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开发时长"
            prop="developPd"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入开发时长', trigger: 'change'},
            ]"
          >
            <el-input-number controls-position="right" :step="0.1" :min="0.1" v-model="demandForm.developPd"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="测试时长"
            prop="testPd"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入测试时长', trigger: 'change'},
            ]"
          >
            <el-input-number controls-position="right" :step="0.1" :min="0.1" v-model="demandForm.testPd"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="子需求数"
            prop="subDemand"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入子需求数', trigger: 'change'},
            ]"
          >
            <el-input-number controls-position="right"  :step="1" :min="1" v-model="demandForm.subDemand"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="用例数"
            prop="caseCount"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入用例数', trigger: 'change'},
            ]"
          >
            <el-input-number controls-position="right"  :step="1" :min="0" v-model="demandForm.caseCount"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Bug数量"
            prop="bugCount"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入Bug数量', trigger: 'change'},
            ]"
          >
            <el-input-number controls-position="right"  :step="1" :min="0" v-model="demandForm.bugCount"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="备注"
            prop="remark"
            :label-width="formLabelWidth"
          >
            <el-input
              type="textarea"
              :autosize="{minRows: 4, maxRows: 6}"
              placeholder="请输入备注"
              v-model="demandForm.remark">
            </el-input>
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
          actualDate: '',
          uatDate: '',
          actualOnlineDate: '',
          testPeriod: '',
          developPd: '',
          testPd: '',
          subDemand: '',
          caseCount: '',
          bugCount: '',
          remark: '',
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
          this.demandForm.testPeriod = [this.demandForm.testStartDate, this.demandForm.testEndDate]
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
        if (this.type === 'copy') {
          delete this.demandForm._id
        }
        const payload = this.demandForm
        payload.testStartDate = payload.testPeriod[0]
        payload.testEndDate = payload.testPeriod[1]
        api.post(submitUrl, payload)
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
  .el-range-editor.el-input__inner
    width 100%
</style>
