<!--
 * @Author: luoxiao
 * @Date: 2019-07-27 14:50:53
 * @LastEditors: luoxiao
 * @LastEditTime: 2019-07-27 15:11:31
 * @Description: Top menu
 -->

<template>
  <div class="topMenu-container">
    <div class="welcome">Welcome，Echo!</div>
    <div class="toolbar">
      <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopMenu',
    data() {
      return {
      };
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  .topMenu-container
    height 46px
    border-bottom 1px solid #d9d9d9
    display flex
    align-items center
    justify-content space-between
    padding 0 15px
    background-color white
    .welcome
      font-size 14px
    .toolbar
      position relative
</style>