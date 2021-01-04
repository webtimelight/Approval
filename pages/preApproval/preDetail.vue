<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">预审详情</block>
			<view slot="right" v-if="currentNav==0&&childrenHasSave" class="ope flex align-center" @click="saveForm"><text class="icon fa fa-save"></text>保存</view>
		</cu-custom>
		
		<!-- 选项卡 -->
		<com-scroll-tab :dataList="tabs" v-model="currentNav" activeColor="#0b8ffe" ></com-scroll-tab>
		
		<!-- 主体内容 -->
		<view class="main-wrap">
			<!-- =========申请材料 ===========-->
			<view class="con-item" v-show="currentNav==0">
				<!-- 申请书菜单 -->
				<view class="apply-materials">
					<com-scroll-tab :dataList="menus" v-model="currentMenu" template="block" isShowMore >
					</com-scroll-tab>
				</view>
				<!-- 基本信息 -->
				<scroll-view v-show="currentMenu==0" class="scroll-box" scroll-y>
					<info-base hideNav ref="info0"></info-base>
				</scroll-view>
				<!-- 法定代表人 -->
				<scroll-view v-show="currentMenu==1" class="scroll-box" scroll-y>
					<view ref="info1">法定代表人信息</view>
				</scroll-view>
				<!-- 董监事会成员 -->
				<scroll-view v-show="currentMenu==2" class="scroll-box" scroll-y>
					董监事会成员
				</scroll-view>
				<!-- 股东（发起人） -->
				<scroll-view v-show="currentMenu==3" class="scroll-box" scroll-y>
					股东（发起人）
				</scroll-view>
				<!-- 联络员信息 -->
				<scroll-view v-show="currentMenu==4" class="scroll-box" scroll-y>
					联络员信息
				</scroll-view>
				<!-- 许可信息 -->
				<scroll-view v-show="currentMenu==5" class="scroll-box" scroll-y>
					许可信息
				</scroll-view>
				<!-- 授权委托 -->
				<scroll-view v-show="currentMenu==6" class="scroll-box" scroll-y>
					授权委托
				</scroll-view>
				<!-- 多证合一 -->
				<scroll-view v-show="currentMenu==7" class="scroll-box" scroll-y>
					多证合一
				</scroll-view>
				<!-- 人员实名认证 -->
				<scroll-view v-show="currentMenu==8" class="scroll-box" scroll-y>
					人员实名认证
				</scroll-view>
				<!-- 附件信息 -->
				<scroll-view v-show="currentMenu==9" class="scroll-box" scroll-y>
					附件信息
				</scroll-view>
			</view>
			<!-- ============信息预审============ -->
			<view class="con-item" v-show="currentNav==1">
				<com-mescroll-view ref="mescrollRef" @init="mescrollInit" :fixed="false" height="auto" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
					<!-- 预审意见 -->
					<view class="suggest-ope">
						<view class="cu-bar">
							<view class="action">
								<text class="cuIcon-title text-orange"></text>
								<text class="text-orange">预审意见</text>
							</view>
						</view>
						<com-form ref="formSuggest" :model="infoSuggest" :rules="rulesSuggest" :label-style="{'flex-basis':'260rpx'}">
							<com-form-item label="材料指导人员" prop="member">
								<input class="form-input" placeholder-class="placeholder" v-model="infoSuggest.member" placeholder="填写材料指导人员" />
							</com-form-item>
							<com-form-item label="材料指导日期" prop="date">
								<picker  class="picker" mode="date" @change="DateChange($event,'date')">
									<text class="value" v-if="infoSuggest.date">{{infoSuggest.date}}</text>
									<text v-else class="placeholder">选择材料指导日期</text>
								</picker>
							</com-form-item>
							<com-form-item label="材料指导意见" label-position="top">
								<!-- 标题区域 -->
								<view slot="titleRight">
									<button class="cu-btn bg-blue shadow round margin-right-sm">选择</button>
									<button class="cu-btn bg-blue shadow round">意见暂存</button>
								</view>
								<!-- value区域 -->
								<textarea class="textarea f-14" style="height: 200rpx" :maxlength="2000" placeholder-class="placeholder f-14"  v-model="infoSuggest.sug_content" placeholder="请填写指导意见（不超过2000字）"></textarea>
							</com-form-item>
						</com-form>
						
						<view class="btn-gropu flex justify-between padding padding-bottom-lg padding-top-lg bg-white">
							<button class="cu-btn bg-green shadow" @click="suggestSubmit">材料指导完成</button>
							<button class="cu-btn bg-blue shadow">材料指导退回</button>
							<button class="cu-btn bg-red shadow">名称驳回</button>
						</view>
					</view>	
					<!-- 意见列表 -->
					<view class="suggest-list">
						<view class="cu-bar">
							<view class="action">
								<text class="cuIcon-title text-orange"></text>
								<text class="text-orange">意见列表</text>
							</view>
						</view>
						<view class="list">
							<view class="list-item" v-for="(item,index) in sugList" :key="index">
								<view class="middle solid-bottom">
									<view class="item text-cut text-green" v-if="item.result==0">预审结果：通过</view>
									<view class="item text-cut text-red" v-if="item.result==1">预审结果：驳回</view>
									<view class="item">预审意见：{{item.sug_content}}</view>
								</view>
								<view class="footer flex justify-between">
									<view class="left">
										<text>预审日期：</text>{{item.date}}
									</view>
									<view class="right">
										工作人员：{{item.worker}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</com-mescroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import API from "@/mock/mock.js"
	
	import InfoBase from '@/pages/preApproval/preInfo/infoBase'
	import MescrollMixin from "@/components/com-mescroll-view/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components:{InfoBase},
		data() {
			return {
				currentNav:0,
				currentMenu:0,
				childrenHasSave:false,
				tabs:['申请材料','信息预审'],
				menus:['基本信息','法定代表人','董监事会成员','股东（发起人）','联络员信息','许可信息','授权委托','多证合一','人员实名认证','附件信息'],
				/* 审批意见信息 */
				infoSuggest:{
					member:'王晓静',
					date:this.getDate(),
					sug_content:''
				},
				/* 审批意见表单验证 */
				rulesSuggest:{
					member:{required: true,message: '材料指导人员不能为空'},
					date:[
						{required: true,message: '预审日期不能为空'}
					]
				},
				sugList:[],
				// 下拉刷新的配置
				downOption:{
					use:false//禁用
				},
				// 上拉加载的配置(可选)
				upOption: {
					auto: true,//默认true
					page: {
						size: 4 // 每页数据,默认10
					},
					noMoreSize: 4, // 列表的总数大于等于n条才显示'-- END --'的提示
					textNoMore:'-- 暂无更多内容--',
					empty: {
						tip: '暂无历史意见'
					}
				}
			}
		},
		mounted() {
			this.hasSave()
		},
		watch:{
			currentMenu(){
				this.hasSave()
			}
		},
		methods: {
			/* 判断有子组件无保存 */
			hasSave(){
				let childRef=this.$refs[`info${this.currentMenu}`]
				if (!childRef){
					return this.childrenHasSave=false
				}
				if(childRef.save){
					this.childrenHasSave=true
				}else{
					this.childrenHasSave=false
				}
			},
			/* 右上角保存 */
			saveForm(){
				let childRef=this.$refs[`info${this.currentMenu}`];
				childRef.save()
			},
			/*上滑加载*/
			async upCallback(page){
				//实际请求
				/* this.$http({
					url:'/xxx.sugList',
					data:{page:page.num,rows:page.size,...this.query}
				}); */
				/*模拟接口*/
				const {data:res}=await API.apiSugList();
				if(page.num==1){this.sugList=[]};
				this.sugList=this.sugList.concat(res.results);
				this.mescroll.endBySize(res.results.length, res.page.totalnum);
			},
			/* 提交操作 */
			suggestSubmit(){
				this.$refs.formSuggest.validate((res) => {
					if (res) {
						uni.showToast({
							title: '提交成功'
						})
					}
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 80;
				} else if (type === 'end') {
					year = year + 10;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss">
page,.page-wrap{height: 100%;}

/* 申请书 */
.apply-materials{
	padding:36rpx 0 30rpx 0 ;background: #ffffff;margin-bottom: 20rpx;
	/deep/ .tab-item:nth-child(1){
		padding-left: 30rpx!important;
	}
}	

/* 布局 */
page{height: 100%}
.page-wrap{
	height:100%;display: flex;flex-direction: column;
	.main-wrap{
		flex: 1;overflow: hidden;
		.con-item{
			height: 100%;display: flex;flex-direction: column;
			.scroll-box{
				flex:1;overflow: hidden;
			}
		}
		
	}
}
/* 意见填写区域 */
.suggest-ope{
	.form-wrap{
		padding:0 30rpx;background: #ffffff;
		.cu-form-group {
			padding: 30rpx 0;
			.title-group{
				padding-bottom: 30rpx;
				.title{flex: 1;margin-top: 24rpx}
				.cu-btn:not(:last-child){
					margin-right: 30rpx;
				}
			}
			.title{
				flex:0 0 260rpx;
				margin-top: 0;
			}
			.textarea{
				margin: 0;height: auto;min-height: 200rpx;line-height: 1.4;
			}
			.btn-gropu{
				padding:20rpx 0 26rpx 0;
				flex: 1;
			}
		}
	} 
} 
/* 意见列表区域 */
.suggest-list{
	.list{
		padding:0 30rpx 30rpx 30rpx;
		margin: -30rpx 0;
		.list-item{
			background: #ffffff;border-radius: 12rpx;padding:0 30rpx;margin:30rpx 0;
			.header{
				padding: 24rpx 0;
				.left{font-size: 30rpx;font-size: 30rpx;}
				.right{line-height: normal;font-size: 30rpx;}
			}
			.middle{
				padding: 24rpx 0;font-size: 30rpx;
				.item{font-size: 30rpx;}
			}
			.footer{
				padding: 24rpx 0;
				.left,.right{font-size: 26rpx;line-height: normal;color:#999}
			}
		}
	}
}
</style>
