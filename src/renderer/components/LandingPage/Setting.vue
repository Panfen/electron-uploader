<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="setting-tabs">

  	<!-- 七牛云设置 -->
    <el-tab-pane label="七牛云" name="qiniu">
      <el-col :span="12" :offset="6">
      	<el-form :model="qiniuForm" status-icon :rules="qiniuRules" ref="qiniuForm" class="qiniu-form">
  			  <el-form-item prop="accesskey">
            <el-col :span="6" class="label">AccessKey</el-col>
  			  	<el-col :span="18">
  			    	<el-input v-model.accesskey="qiniuForm.accesskey" size="medium"></el-input>
  			    </el-col>
  			  </el-form-item>
  			  <el-form-item prop="secretkey">
            <el-col :span="6" class="label">SecretKey</el-col>
  			  	<el-col :span="18">
  			    	<el-input v-model.secretkey="qiniuForm.secretkey" size="medium"></el-input>
  			    </el-col>
  			  </el-form-item>
  			  <el-form-item prop="storespace">
            <el-col :span="6" class="label">存储空间</el-col>
  			  	<el-col :span="18">
  			    	<el-input v-model.storespace="qiniuForm.storespace" size="medium"></el-input>
  			    </el-col>
  			  </el-form-item>
  			  <el-form-item prop="uploadurl">
            <el-col :span="6" class="label">上传网址</el-col>
  			  	<el-col :span="18">
  			    	<el-input v-model.uploadurl="qiniuForm.uploadurl" size="medium"></el-input>
  			    </el-col>
  			  </el-form-item>
  			  <el-form-item id="controll-box">	
  			    <el-button type="primary" size="medium" @click="submitQiniuForm('qiniuForm')">确定</el-button>
  			    <el-button size="medium" @click="resetQiniuForm('qiniuForm')">重置</el-button>
  			  </el-form-item>
  			</el-form>
      </el-col>
    </el-tab-pane>

    <!-- 阿里云设置 -->
    <el-tab-pane label="阿里云" name="aliyun">阿里云</el-tab-pane>

    <!-- 其他云设置 -->
    <el-tab-pane label="其他云" name="other">其他云</el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data () {
    	var checkQiniuAccessKey = (rule, value, callback) => {
    		if(!value){
    			return callback(new Error('AccessKey不能为空'));
    		}else{
    			callback();
    		}
    	}
    	var checkQiniuSecretKey = (rule, value, callback) => {
    		if(!value){
    			return callback(new Error('SecretKey不能为空'));
    		}else{
    			callback();
    		}
    	}
    	var checkQiniuStoreSpace = (rule, value, callback) => {
    		if(!value){
    			return callback(new Error('存储空间不能为空'));
    		}else{
    			callback();
    		}
    	}
    	var checkQiniuUploadUrl = (rule, value, callback) => {
    		if(!value){
    			return callback(new Error('上传网址不能为空'));
    		}else{
    			callback();
    		}
    	}
      return {
        activeName: 'qiniu',
        qiniuForm: {
        	accesskey: '',
        	secretkey: '',
        	storespace: '',
        	uploadurl: ''
        },
        qiniuRules: {
        	accesskey: [
        		{ validator: checkQiniuAccessKey, trigger: 'blur' }
        	],
        	secretkey: [
        		{ validator: checkQiniuSecretKey, trigger: 'blur' }
        	],
        	storespace: [
        		{ validator: checkQiniuStoreSpace, trigger: 'blur' }
        	],
        	uploadurl:  [
        		{ validator: checkQiniuUploadUrl, trigger: 'blur' }
        	],
        }
      }
    },
    methods:{
    	handleClick(tab, event) {
        // console.log(tab, event);
      },
      submitQiniuForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.$db.set('picBed.qiniu', this.qiniuForm).write();
            this.$notify({
              title: '提示',
              message: '设置成功',
              type: 'success',
              duration: 1500
            });
          }else {
            this.$notify.error({
              title: '提示',
              message: '设置失败，请检查填写字段',
              duration: 1500
            });
            return false;
          }
        });
      },
      resetQiniuForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .setting-tabs{
    margin-left: 10px;
  }
  .qiniu-form{
  	margin: 40px auto;
  }
  #controll-box{
    text-align: center;
  }
</style>