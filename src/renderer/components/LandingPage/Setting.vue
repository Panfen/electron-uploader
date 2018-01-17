<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">

  	<!-- 七牛云设置 -->
    <el-tab-pane label="七牛云" name="qiniu">
    	<el-form :model="qiniuForm" status-icon :rules="qiniuRules" ref="qiniuForm" label-width="100px" class="qiniu-form">
			  <el-form-item label="AccessKey" prop="accesskey">
			  	<el-col :span="12">
			    	<el-input v-model.accesskey="qiniuForm.accesskey" size="medium"></el-input>
			    </el-col>
			  </el-form-item>
			  <el-form-item label="SecretKey" prop="secretkey">
			  	<el-col :span="12">
			    	<el-input v-model.secretkey="qiniuForm.secretkey" size="medium"></el-input>
			    </el-col>
			  </el-form-item>
			  <el-form-item label="存储空间" prop="storespace">
			  	<el-col :span="12">
			    	<el-input v-model.storespace="qiniuForm.storespace" size="medium"></el-input>
			    </el-col>
			  </el-form-item>
			  <el-form-item label="上传网址" prop="uploadurl">
			  	<el-col :span="12">
			    	<el-input v-model.uploadurl="qiniuForm.uploadurl" size="medium"></el-input>
			    </el-col>
			  </el-form-item>
			  <el-form-item>	
			    <el-button type="primary" size="medium" @click="submitQiniuForm('qiniuForm')">确定</el-button>
			    <el-button size="medium" @click="resetQiniuForm('qiniuForm')">重置</el-button>
			  </el-form-item>
			</el-form>
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
        console.log(tab, event);
      },
      submitQiniuForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.qiniuForm));
          } else {
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
  .qiniu-form{
  	margin: 20px;
  }
</style>