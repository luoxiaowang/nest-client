<!--
 * @Author: luoxiao
 * @Date: 2019-07-27 11:26:18
 * @LastEditors: luoxiao
 * @LastEditTime: 2019-07-27 15:14:58
 * @Description: 侧边栏
 -->

<template>
  <div class="sideMenu-container">
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="true"
      :default-active="activeIndex"
      :default-openeds="activeOpeneds"
      :router="true"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0" route="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>我的工作台</span>
        </template>
        <el-menu-item index="1-1" route="demand">
          <i class="el-icon-s-marketing"></i>
          <span>需求数据收集</span>
        </el-menu-item>
        <el-menu-item index="1-2" route="analyze">
          <i class="el-icon-s-order"></i>
          <span>过程度量分析</span>
        </el-menu-item>
        <el-menu-item index="1-3" route="fault">
          <i class="el-icon-s-order"></i>
          <span>线上故障系统</span>
        </el-menu-item>
        <el-menu-item index="1-4" route="schedule">
          <i class="el-icon-s-order"></i>
          <span>任务排期</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="2" route="about">
        <i class="el-icon-location"></i>
        <span slot="title">联系我们</span>
      </el-menu-item>
    </el-menu>
    <div class="sidemenu--btn">
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="handleCollapse"></i>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'SideMenu',
    data() {
      return {
        activeIndex: '0',
        isCollapse: false,
        activeOpeneds: []
      };
    },
    methods: {
      handleCollapse() {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .sideMenu-container
    position relative
  .el-menu
    height 100vh
    width 200px
  .el-menu--collapse
    width 65px
  .sidemenu--btn
    position absolute
    bottom 0
    left 0
    width 100%
    height 60px
    display flex
    align-items center
    justify-content center
    border-top 1px solid #999999
    cursor pointer
    .el-icon-s-fold,
    .el-icon-s-unfold
      color white
      font-size 20px
</style>
