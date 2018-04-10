<template>
  <el-row class="wrapper upload-wrapper">
    <el-row>
     	<el-col class="uploader-border" :span="14" :offset="5">
        <div
          :class="{'is-dragover': dragover}"
          @drop.prevent="onDrop" 
          @dragover.prevent="dragover = true" 
          @dragleave.prevent="dragover = false"
        >
          <div @click="openUplodWindow">
            <i class="el-icon-upload"></i>
            <el-col class="tip">将文件拖至方框内，或 <span>点击上传</span></el-col>
          </div>
          <input type="file" id="file-uploader" @change="onFileChange" multiple>
        </div>
      </el-col>
      <el-col :span="14" :offset="5">
        <el-progress 
          :percentage="progress" 
          class="up-progress"
          :show-text="false"
          :class="{'show':showProgress}"
          :status="showError ? 'exception' : ''"
        ></el-progress>
      </el-col>
      <el-col class="link-wrap" :span="14" :offset="5">
        <el-input placeholder="图片链接" v-model="urlLink" size="small">
          <template slot="prepend">URL</template>
          <el-button 
            slot="append" 
            icon="el-icon-document" 
            v-clipboard:copy="urlLink"
            v-clipboard:success="onCopy"
          ></el-button>
        </el-input>
        <el-input placeholder="图片链接" v-model="htmlLink" size="small">
          <template slot="prepend">HTML</template>
          <el-button 
            slot="append" 
            icon="el-icon-document" 
            v-clipboard:copy="htmlLink"
            v-clipboard:success="onCopy"
          ></el-button>
        </el-input>
        <el-input placeholder="图片链接" v-model="markdownLink" size="small">
          <template slot="prepend">Markdown</template>
          <el-button 
            slot="append" 
            icon="el-icon-document" 
            v-clipboard:copy="markdownLink"
            v-clipboard:success="onCopy"
          ></el-button>
        </el-input>
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
        showError: false,
        pasteStyle: '',
        urlLink: '',
        htmlLink: '',
        markdownLink: '',
        dragover: false
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('uploadProgress', (event, progress) => {
        if (progress !== -1) {
          this.showProgress = true,
          this.progress = progress
        } else {
          this.progress = 100,
          this.showError = true
        }
      });
      this.$electron.ipcRenderer.on('filesLinks', (event, links) => {
        this.urlLink = links;
        this.htmlLink = `<img src="${links}"/>`;
        this.markdownLink = `![](${links})`;
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
          this.$notify({
            title: '提示',
            message: '上传成功',
            type: 'success',
            duration: 1500
          });
        }
      }
    },
    beforeDestroy () {
      this.$electron.ipcRenderer.removeAllListeners('uploadProgress');
    },
    methods: {
      onDrop(e){
        this.dragover = false;
        console.log(e.dataTransfer.files)
        this.ipcSendFiles(e.dataTransfer.files);
      },
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
      },
      onCopy () {
        this.$notify({
          title: '提示',
          message: '已复制到粘贴板',
          type: 'success',
          duration: 1500
        });
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
    transition: all ease 0.3s;
    padding: 50px 40px 60px 40px;
  }
  .uploader-border.is-dragover,
  .uploader-border:hover{
    border-color: #409eff;
    background-color: rgba(164, 216, 250, 0.1);
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
    margin:10px 0;
    opacity: 0;
    transition: all .2s ease-in-out;
  }
  .up-progress.show{
    opacity: 1
  }
  .up-progress .el-progress-bar__inner{
    transition: all .2s ease-in-out;
  }
  .link-wrap {
    
    font-size: 12px;
  }
  .el-input__inner{
    height: 20px;
  }
</style>