<template>
  <el-row class="wrapper">
   	<el-col :span="12" class="uploader-border">
      <div @click="openUplodWindow">
        <i class="el-icon-upload"></i>
        <el-col class="tip">将文件拖至方框内，或 <span>点击上传</span></el-col>
      </div>
    </el-col> 
    <input type="file" id="file-uploader" @change="onFileChange" multiple>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    methods: {
      openUplodWindow() {
        document.getElementById('file-uploader').click();
      },
      onFileChange(e) {
        this.ipcSendFiles(e.target.files);
      },
      ipcSendFiles(files) {
        let sendFiles = [];
        Array.from(files).forEach((item, index) => {
          let obj = {
            name: item.name,
            path: item.path
          };
          sendFiles.push(obj);
        });
        this.$electron.ipcRenderer.send('uploadChoosedFiles', sendFiles);
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
  .uploader-border{
    border: 1px dashed #666;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    padding: 50px 0 60px;
  }
  .uploader-border:hover{
    border-color: #409eff;
  }
  .uploader-border i{
    font-size: 40px;
    color: #666;
  }
  .uploader-border .tip{
    font-size: 12px;
    font-family: "微软雅黑";
    margin-top: 12px;
  }
  .uploader-border .tip span{
    color: #409eff;
  }
  #file-uploader{
    display: none;
  }
</style>