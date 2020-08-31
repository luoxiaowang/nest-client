<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>二维码生成器</span>
    </div>
    <div class="text item">
      <div class="qrcode" ref="qrCodeUrl"></div>
      <br />
      <el-input v-model="qrUrl" placeholder="输入url"></el-input>
    </div>
  </el-card>
</template>

<script>
  import QRCode from 'qrcodejs2'

  export default {
    name: 'QrCode',
    data() {
      return {
        qrcode: null,
        qrUrl: 'http://www.fcbox.com',
      }
    },
    watch: {
      qrUrl(val) {
        this.qrcode.makeCode(val)
      },
    },
    methods: {
      creatQrCode() {
        const qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: 'http://www.fcbox.com',
          width: 150,
          height: 150,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
        this.qrcode = qrcode
      },
    },
    created () {
      this.$nextTick(() => {
        this.creatQrCode()
      })
    }
  }
</script>