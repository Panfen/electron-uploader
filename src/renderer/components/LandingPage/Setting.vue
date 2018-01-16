<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">

  	<!-- 七牛云设置 -->
    <el-tab-pane label="七牛云" name="qiniu">
    	<el-form :model="qiniuForm" status-icon :rules="qiniuRules" ref="qiniuForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="AccessKey" prop="accesskey">
			  	<el-col :span="12">
			    	<el-input v-model.accesskey="qiniuForm.accesskey" size="medium"></el-input>
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
      return {
        activeName: 'qiniu',
        qiniuForm: {
        	accesskey: ''
        },
        qiniuRules: {
        	accesskey: [
        		{ validator: checkQiniuAccessKey, trigger: 'blur' }
        	]
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
            alert('submit!');
          } else {
            console.log('error submit!!');
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
  
</style>