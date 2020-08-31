<template>
  <div class="tools-container">
    <!-- 同环比工具 -->
    <RateCalc />
    <br />
    <QrCode />
  </div>
</template>

<script>
  import RateCalc from './components/RateCalc'
  import QrCode from './components/QrCode'

  export default {
    name: 'Tools',
    data() {
      return {
      }
    },
    components: {
      RateCalc,
      QrCode,
    },
  }
</script>

<style lang="stylus" scoped>
  .tools-container
    padding 24px 24px 0
</style>