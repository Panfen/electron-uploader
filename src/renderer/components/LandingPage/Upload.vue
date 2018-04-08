<template>
  <el-row class="wrapper upload-wrapper">
    <el-row>
     	<el-col class="uploader-border">
        <div @click="openUplodWindow">
          <i class="el-icon-upload"></i>
          <el-col class="tip">将文件拖至方框内，或 <span>点击上传</span></el-col>
        </div>
        <input type="file" id="file-uploader" @change="onFileChange" multiple>
      </el-col>
      <el-col>
        <el-progress :percentage="50" class="up-progress"></el-progress>
      </el-col>
    </el-row>
  </el-row>
  
</template>

<script>
  export default {
    data () {
      return {
        progress: 0,
        showProgress: false,
        showError: 0,
        pasteStyle: ''
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('uploadProgress', (event, progress) => {
        console.log('捕获数据')
        if (progress !== -1) {
          this.showProgress = true,
          this.progress = progress
        } else {
          this.progress = 100,
          this.showError = true
        }
      });
      this.getPasteStyle();
    },
    watch: {
      progress (val) {
        if (val === 100) {
          setTimeout(() => {
            this.showProgress = false;
            this.showError = false;
          }, 1000);
          setTimeout(() => {
            this.progress = 0;
          }, 1200);
        }
      }
    },
    beforeDestroy () {
      this.$electron.ipcRenderer.removeAllListeners('uploadProgress');
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
      },
      getPasteStyle () {
        this.pasteStyle = this.$db.read().get('picBed.pasteStyle').value() || 'markdown';
      }
    }
  }
</script>

<style scoped>
  .wrapper{
  	height: 100%;
  }
  .upload-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .uploader-border{
    border: 1px dashed #666;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    padding: 50px 40px 60px 40px;
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
  .up-progress{
    margin-top:12px; 
  }
</style>