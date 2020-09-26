<template>
  <div id="app">
    <div class="app-container">
      <SideMenu />
      <div class="app-content">
        <TopMenu />
        <div class="box">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SideMenu from '@/components/layout/SideMenu'
  import TopMenu from '@/components/layout/TopMenu'
  export default {
    name: 'App',
    components: {
      SideMenu,
      TopMenu,
    }
  }
</script>

<style>
body {
  margin: 0px
}

#app {
  font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #2c3e50;
}

.app-container {
  display: flex;
}

.app-content {
  flex: 1;
  background: #f3f7fc;
  display: flex;
  flex-direction: column;
}

.app-content .box {
  overflow-y: auto;
  width: calc(100vw - 202px);
  height: calc(100vh - 47px);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
