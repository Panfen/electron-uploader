<template>
  <div id="wrapper">
    <el-row class="logo">
      <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    </el-row>
    <el-row class="content">
      <el-col :span="4" class="left">
        <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleMenuSelect">
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
    methods: {
      handleMenuSelect (key ,keyPath) {
        if(keyPath[0] == '1'){
          this.$router.push('/upload');
        }else if(keyPath[0] == '2'){
          this.$router.push('/album');
        }else if(keyPath[0] == '3'){
          this.$router.push('/setting');
        }
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
    height: 14vh;
    width: auto;
  }
  .content{
    margin-top: 10px;
    height: 78vh;
  }
  .left{
    height: 100%;
    background: #2c3e50;
    border-right: solid 1px #e6e6e6;
  }
  .right{
    height: 100%;
    padding: 4px 10px;
    background: #fff;
  }
</style>
