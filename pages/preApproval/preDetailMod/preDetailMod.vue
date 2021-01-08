<template>
	<view class="page-pre-detail">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">预审-变更登记</block>
		</cu-custom>
		
		<!-- 选项卡 -->
		<com-scroll-tab :dataList="tabs" v-model="currentNav" activeColor="#0b8ffe"></com-scroll-tab>
		
		<!-- 主体内容 -->
		<view class="main-con">
			<!-- =========企业信息 ===========-->
			<view class="con-item" v-show="currentNav==0">
				<!-- 企业信息菜单 -->
				<view class="apply-materials">
					<com-scroll-tab :dataList="menus" v-model="currentMenu" template="block" isShowMore></com-scroll-tab>
				</view>
				<!-- 变更事项 -->
				<scroll-view v-show="currentMenu==0" class="scroll-box" scroll-y>
					<info-change hideNav ref="info0"></info-change>
				</scroll-view>
				<!-- 法定代表人 -->
				<scroll-view v-show="currentMenu==1" class="scroll-box" scroll-y>
					<info-legal hideNav ref="info1"></info-legal>
				</scroll-view>
				<!-- 人员信息 -->
				<scroll-view v-show="currentMenu==2" class="scroll-box" scroll-y>
					<info-member hideNav ref="info2"></info-member>
				</scroll-view>
				<!-- 出资信息 -->
				<scroll-view v-show="currentMenu==3" class="scroll-box" scroll-y>
					<info-share hideNav ref="info3"></info-share>
				</scroll-view>
				<!-- 许可信息 -->
				<scroll-view v-show="currentMenu==4" class="scroll-box" scroll-y>
					<info-permit hideNav ref="info4"></info-permit>
				</scroll-view>
				<!-- 联络员 -->
				<scroll-view v-show="currentMenu==5" class="scroll-box" scroll-y>
					<info-liaison hideNav ref="info5"></info-liaison>
				</scroll-view>
				<!-- 授权委托 -->
				<scroll-view v-show="currentMenu==6" class="scroll-box" scroll-y>
					<info-author hideNav ref="info6"></info-author>
				</scroll-view>
				<!-- 多证合一 -->
				<scroll-view v-show="currentMenu==7" class="scroll-box" scroll-y>
					<info-licence hideNav ref="info7"></info-licence>
				</scroll-view>
				<!-- 附件信息 -->
				<scroll-view v-show="currentMenu==8" class="scroll-box" scroll-y>
					<info-stuff hideNav ref="info8"></info-stuff>
				</scroll-view>
			</view>
			<!-- ============办理意见============ -->
			<view class="con-item" v-show="currentNav==1">
				<com-mescroll-view ref="mescrollRef" @init="mescrollInit" :fixed="false" height="auto" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
					<!-- 审批意见 -->
					<view class="suggest-ope">
						<view class="cu-bar">
							<view class="action">
								<text class="cuIcon-title text-orange"></text>
								<text class="text-orange">审批意见</text>
							</view>
						</view>
						<com-form ref="formSuggest">
							<com-form-item label="办理人">
								<view class="info">{{infoSuggest.member}}</view>
							</com-form-item>
							<com-form-item label="办理时间">
								<view class="info">{{infoSuggest.date}}</view>
							</com-form-item>
							<com-form-item label="办理意见">
								<picker class="picker" @change="PickerChange($event,'sug_option')" :range="enums.agree" range-key="name">
									<view>
										<text v-if="!enums.agree[infoSuggest.sug_option]" class="placeholder f-14">请选择</text>
										<text v-else class="flex align-center">
											{{enums.agree[infoSuggest.sug_option].name}}
											<text class="lg text-gray cuIcon-unfold padding-left-sm"></text>
										</text>
									</view>
								</picker>
								<button class="cu-btn bg-blue shadow round">意见设置</button>
							</com-form-item>
							<com-form-item label="意见" label-position="top">
								<textarea class="textarea f-14" style="height: 200rpx" :maxlength="2000" placeholder-class="placeholder f-14"  v-model="infoSuggest.sug_content" placeholder="请填写审批意见"></textarea>
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
									<view class="item">审批步骤：{{item.step}}</view>
									<view class="item">通知文书号：{{item.code}}</view>
									<view class="item text-cut text-green" v-if="item.result==0">审批结果：通过</view>
									<view class="item text-cut text-red" v-if="item.result==1">审批结果：驳回</view>
									<view class="item">审批意见：{{item.sug_content}}</view>
								</view>
								<view class="footer flex justify-between">
									<view class="left">
										<text>审批日期：</text>{{item.date}}
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
	import infoChange from '@/pages/modify/modInfo/infoChange' //变更事项
	import infoLegal from '@/pages/modify/modInfo/infoLegal'  //法定代表人
	import infoMember from '@/pages/modify/modInfo/infoMember' //人员信息--董监事经理？
	import infoShare from '@/pages/modify/modInfo/infoShare'  //出资信息 --股东（发起人）？
	import infoPermit from '@/pages/modify/modInfo/infoPermit'  //许可信息
	import infoLiaison from '@/pages/modify/modInfo/infoLiaison'  //联络员
	import infoAuthor from '@/pages/modify/modInfo/infoAuthor'  //委托授权
	import infoLicence from '@/pages/modify/modInfo/infoLicence'  //多证合一
	import infoStuff from '@/pages/modify/modInfo/infoStuff'  //附件信息--提交材料？
	import MescrollMixin from "@/components/com-mescroll-view/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components:{infoChange,infoLegal,infoMember,infoShare,infoPermit,infoLiaison,infoAuthor,infoLicence,infoStuff},
		data() {
			return {
				enums:{
					agree:[{value:'0',name:'同意'},{value:'1',name:'驳回'}]
				},
				currentNav:0,
				currentMenu:0,
				childrenHasSave:false,
				tabs:['变更申请','办理意见'],
				menus:['变更事项','法定代表人','人员信息','出资信息','许可信息','联络员','授权委托','多证合一','附件信息'],
				picker: ['同意', '驳回'],
				infoSuggest:{
					member:'王晓静',
					date:this.getDate(),
					sug_option: '0',
					sug_content:''
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
		methods: {
			/* 判断有子组件无保存 */
			hasSave(){
				let childRef=this.$refs[`info${this.currentMenu}`];
				if (!childRef){
					return this.childrenHasSave=false
				}
				console.log(this.$refs)
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
			/* 表单操作 */
			PickerChange(e,val) {
				this.infoSuggest[val] = e.detail.value
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
page,.page-pre-detail{height: 100%;}

/* 申请书 */
.apply-materials{
	padding:36rpx 0 30rpx 0 ;background: #ffffff;margin-bottom: 20rpx;
	/deep/ .tab-item:nth-child(1){
		padding-left: 30rpx!important;
	}
}	
/* 布局 */
page{height: 100%}
.page-pre-detail{
	height:100%;display: flex;flex-direction: column;
	.main-con{
		flex: 1;overflow: hidden;
		.con-item{
			height: 100%;display: flex;flex-direction: column;
			.scroll-box{
				flex:1;overflow: hidden;
				/deep/ {
					.list{
						padding: 10rpx 30rpx 10rpx 30rpx;
					}
				}
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
		.picker{
			min-height: 48rpx;line-height: normal;text-align: left;font-size: 30rpx;
			.icon{padding-left:20rpx;}
		}
		uni-picker::after{display: none;}
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
