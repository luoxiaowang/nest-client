<template>
  <div class="schedule-container">
    <el-calendar ref="scheduleCal">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          <span class="dataNum">{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</span>
          <div class="operate" v-if="data.isSelected">
            <el-button type="primary" size="mini" round @click="handleAdd(data)">排期</el-button>
          </div>
          <div class="planList">
            <div class="planItem" v-for="(item, index) in getCurrentPlans(data.day)" :key="index">
              <span class="name">【{{item.planR}}】：</span>
              <span class="title">{{item.name}}</span>
            </div>
          </div>
        </p>
      </template>
    </el-calendar>
    <ScheduleDialog
      :dialogFormVisible="dialogFormVisible"
      :current="current"
      @hideDialog="hideDialog"
      @handleSearch="handleSearch"
    />
  </div>
</template>

<script>
  import ScheduleDialog from './components/ScheduleDialog'
  import { api } from '@/common/api'
  import { filter } from 'lodash'

  export default {
    name: 'ScheduleCal',
    data() {
      return {
        dialogFormVisible: false,
        current: '',
        data: [],
      }
    },
    components: {
      ScheduleDialog,
    },
    computed: {

    },
    methods: {
      showDialog() {
        this.dialogFormVisible = true
      },

      hideDialog() {
        this.dialogFormVisible = false
      },

      handleSearch() {
        const currentFirstMonth = this.$refs.scheduleCal && this.$refs.scheduleCal.curMonthDatePrefix
        const currentYear = currentFirstMonth.split('-')[0]
        const currentMonth = currentFirstMonth.split('-')[1]
        const countDays = this.mGetDate(currentYear, currentMonth)
        this.loading = true;
        const ajaxData = {
          startDate: `${currentFirstMonth}-01`,
          endDate: `${currentFirstMonth}-${countDays}`
        }
        api.get('/api/schedule', {
          params: ajaxData,
        })
        .then((res) => {
          this.loading = false;
          this.data = res.data || [];
        })
        .catch(() => {
          this.loading = false;
        })
      },

      handleAdd(data) {
        this.current = data.day
        this.showDialog()
      },

      mGetDate(year, month){
        const date = new Date(year, month, 0);
        return date.getDate();
      },

      getCurrentPlans(day) {
        return filter(this.data || [], {'planDate': day})
      },

    },
    created() {
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
  }
</script>

<style lang="stylus" scoped>
  .schedule-container
    .dataNum
      font-size 16px
      font-weight bold
    >>>.el-calendar-table
      .current
        &:hover
          background-color #F2F8FE
      .el-calendar-day
        height auto
        min-height 85px
        &:hover
          background-color transparent
        .operate
          display flex
          justify-content center
      .planList
        margin-top 10px
        .planItem
          .name
            font-weight bolder
      .is-today
        .planItem
          .name
            color red
          .title
            color red
    .is-selected
      color #1989FA
</style>