<template>
  <div id="wrapper">
    <el-row class="logo">
      <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    </el-row>
    <el-row class="content">
      <el-col :span="4" class="left">
        <el-menu default-active="2" class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-upload"></i>
            <span slot="title">上传图片</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">图片列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">上传设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="right">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Avenir', Helvetica, Arial, sans-serif }

  #app{background: #F4F3F8;}

  #wrapper {
    /*视窗高度： 总的为100vh*/
    height: 100vh;
    width: 100vw;
    position: relative;
  }
  .logo{
    background: #FCFCFC;
    padding: 4px 10px;
  }
  #logo {
    height: 20vh;
    width: auto;
  }
  .content{
    margin-top: 10px;
    height: 70vh;
  }
  .left{
    height: 100%;
    background: #2c3e50;
  }
  .right{
    height: 100%;
    padding: 4px 10px;
    background: #fff;
  }
</style>
