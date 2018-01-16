<template>
  <el-row class="wrapper">
   	<el-upload class="upload-demo" drag multiple action="">
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">只能上传JPG/PNG文件，大小不超过500KB</div>
		</el-upload>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
  .wrapper{
  	height: 100%;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  }
</style>