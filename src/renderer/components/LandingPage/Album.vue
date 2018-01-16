<template>
	<el-row class="wrapper">
		<!-- S  topbar -->
		<el-row class="topbar">
			<el-col :span="18">
				<el-col :span="8">
					<el-input placeholder="图片名称" prefix-icon="el-icon-search" v-model="picname" :change="handleSearch" size="medium"></el-input>
				</el-col>
				<el-button class="refresh-pic" icon="el-icon-refresh" size="medium">换一批</el-button>
				<span class="pic-amount">共 125 张</span>
			</el-col>
			<el-col :span="6">
				<el-button type="primary" id="manage-pic" size="medium" @click="batchManageAct">
				{{batchManageTitle}}</el-button>
			</el-col>
		</el-row>
		<!-- E topbar -->

		<!-- pic list -->
		<el-row class="piclist">
			<el-checkbox-group v-model="checkedPics" @change="handleCheckedPicsChange">
				<ul>
					<li v-for="(url,index) in urlList" class="pic-wrap">
						<img v-bind:src="url" @click="viewPicAct(index)"/>
						<el-checkbox v-show="checkShow" :key="url" :label="url" class="pic-checkbox"></el-checkbox>
					</li>
				</ul>
			</el-checkbox-group>
			<el-checkbox v-model="checkAll" v-show="checkShow" @change="handleCheckAllChange">全选</el-checkbox>
		</el-row>

		<!-- 弹出层 -->
		<el-dialog title="图片查看" class="view-dialog" :visible.sync="viewPicDialogVisible" v-bind:showClose="false">
			<p>仙女布偶</p>
		  <img v-bind:src="currentUrl">
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="viewPicDialogVisible=false">取 消</el-button>
		    <el-button type="danger" @click="delePicAct">删 除</el-button>
		  </span>
		  <i class="el-icon-arrow-left prev" @click="prevPicAct"></i>
			<i class="el-icon-arrow-right next" @click="nextPicAct"></i>
		</el-dialog>
		
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				viewPicDialogVisible: false,
				uploadPicDialogVisible: false,
				picname: '',
				currentIndex: 0,
				currentUrl: '',
				checkAll: false,
				checkedPics: [],
				batchManageTitle: '批量管理',
				checkShow: false,
				urlList: ['http://p3.so.qhimgs1.com/bdr/_240_/t01af075dc8036b8ad3.jpg',
									'http://p0.so.qhimgs1.com/bdr/_240_/t01979009503370fd70.jpg',
									'http://p1.so.qhimgs1.com/bdr/_240_/t01afb32fc2cfcdcedd.jpg',
									'http://p5.so.qhimgs1.com/bdr/_240_/t0112343dc49d5ee49b.jpg',
									'http://p1.so.qhimgs1.com/bdr/_240_/t0148896d9fe40741c1.jpg',
									'http://p5.so.qhimgs1.com/bdr/_240_/t01dd8b291e0798717b.jpg',
									'http://p3.so.qhimgs1.com/bdr/_240_/t0152e74cb98fec1b13.jpg',
									'http://p1.so.qhimgs1.com/bdr/_240_/t015dfce6549888df7d.jpg',
									'http://p1.so.qhimgs1.com/bdr/_240_/t01e0a34cdea51eca5d.jpg'
				],
				fileList: [{name: 'food.jpeg', url: 'http://p3.so.qhmsg.com/bdr/_240_/t01b3f05f12e191b268.jpg'}]
			}
		},
		methods: {
      handleSearch(){
      	//
      },
      viewPicAct(index){
      	this.currentIndex = index;
      	this.currentUrl = this.urlList[index];
      	this.viewPicDialogVisible = true;
      },
      delePicAct(){
      	//
      },
      prevPicAct(){
      	this.currentIndex = this.currentIndex-- <= 0 ? 0 : this.currentIndex--;
      	this.currentUrl = this.urlList[this.currentIndex];
      },
      nextPicAct(){
      	this.currentIndex = this.currentIndex++ >= this.urlList.length - 1 ? this.urlList.length - 1 : this.currentIndex++;
      	this.currentUrl = this.urlList[this.currentIndex];
      },
      handleCheckedPicsChange(value){
      	var checkedCount = value.length;
        this.checkAll = checkedCount === this.urlList.length;
      },
      handleCheckAllChange(val) {
        this.checkedPics = val ? this.urlList : [];
      },
      batchManageAct(){
      	this.checkedPics = [];
      	this.checkAll = false;
      	this.batchManageTitle = this.batchManageTitle == '批量管理' ? '退出管理' : '批量管理';
      	this.checkShow = !this.checkShow;
      }
    }
	}
</script>

<style>
	.wrapper{
		padding: 10px;
		overflow: hidden;
	}
	.refresh-pic{
		margin: 0 6px;
	}
	.pic-amount{
		font-size: 12px;
	}
	#manage-pic{
		float: right;
	}
	#upload-pic{
		margin-left: 6px;
		float: right;
	}
	.piclist{
		margin-top: 20px;
	}
	.piclist ul li.pic-wrap{
		width: 18vw;
		height: 18vh;
		cursor: pointer;
		display: inline-block;
		margin: 0 6px 6px 0;
		position: relative;
	}
	.piclist ul li.pic-wrap img{
		width: 100%;
		height: 100%;
	}
	.piclist ul li.pic-wrap .pic-checkbox{
		top: 4px;
		right: 4px;
		position: absolute;
	}
	.piclist ul li.pic-wrap .pic-checkbox .el-checkbox__label{
		display: none;
	}
	.view-dialog .el-dialog__body{
		position: relative;
		text-align: center;
	}
	.view-dialog .el-dialog__body p{
		margin-bottom: 6px;
	}
	.view-dialog .el-dialog__body i{
		width: 60px;
		height: 100%;
		top:0;
		display: block;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.view-dialog .el-dialog__body i:hover{
		transform: scale(1.2);
	}
	.view-dialog .el-dialog__body i.prev{
		left: 10px;
	}
	.view-dialog .el-dialog__body i.next{
		right: 10px;
	}
</style>