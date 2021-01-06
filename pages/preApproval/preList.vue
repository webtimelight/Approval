<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">预审列表</block>
			<view slot="right" class="ope flex align-center padding" v-if="!skeletonShow" @click="showDrawer"><text class="icon cuIcon-filter"></text>筛选</view>
		</cu-custom>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 列表骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="list"></com-quick-skeleton>
			<!-- 列表 -->
			<com-mescroll-view ref="mescrollRef" @init="mescrollInit" :fixed="false" height="auto" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" @click="goDetail(v)">
						<view class="header flex justify-between align-center solid-bottom">
							<view class="left text-cut">{{v.name}}</view>
							<view class="right cu-tag bg-green radius" v-if="v.type==0">设立</view>
							<view class="right cu-tag bg-orange radius" v-if="v.type==1">变更</view>
							<view class="right cu-tag bg-brown radius" v-if="v.type==2">注销</view>
						</view>
						<view class="middle solid-bottom">
							<view class="item text-cut">注册号：{{v.regnum}}</view>
							<view class="item text-cut">负责人：{{v.mem}}</view>
							<view class="item text-cut">统一社会信用代码：{{v.code}}</view>
						</view>
						<view class="footer flex justify-between">
							<view class="left">
								<text class="text-green">申请日期：</text>{{v.creat_date}}
							</view>
							<view v-if="v.worker" class="right text-blue">
								经办人：{{v.worker}}
							</view>
						</view>
					</view>
				</view>
			</com-mescroll-view>
		</view>
		<!-- 筛选 -->
		<view class="cu-modal drawer-modal justify-end" :class="drawerShow?'show':''" @click="hideDrawer">
			<view class="cu-dialog basis-lg" 
			:style="{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}" 
			@click.stop="" >
				<!-- 查询表单 -->
				<view class="query-area flex flex-column">
					<com-form class="com-form-container">
						<com-form-item label="企业名称" label-position="top">
							<input v-model="query.ent_name" class="form-input" placeholder-class="placeholder f-14"  placeholder="填写企业名称" />
						</com-form-item>
						<com-form-item label="统一社会信用代码/注册" label-position="top">
							<input v-model="query.code_num" class="form-input" placeholder-class="placeholder f-14"  placeholder="填写统一社会信用代码/注册号" />
						</com-form-item>
						<com-form-item label="是否全程电子化" label-position="top" style="margin-bottom: -20rpx;">
							<view class="check-group">
								<radio-group class="check-list" @change="RadioChange($event,'is_electron')">
									<label class="check-item" v-for="(item,index) in enums.electron" :key="index">
										<radio class="radio-item" :checked="item.value==query.is_electron" :value="item.value"></radio>
										{{item.name}}
									</label>
								</radio-group>
							</view>
						</com-form-item>
						<com-form-item label="申报日期起" label-position="top">
							<picker  class="picker" mode="date"  @change="DateChange($event,'start_date')">
								<text v-if="!query.start_date" class="placeholder f-14">选择日期</text>
								<text v-else>{{query.start_date}}</text>
							</picker>
						</com-form-item>
						<com-form-item label="申报日期止" label-position="top">
							<picker  class="picker" mode="date"  @change="DateChange($event,'end_date')">
								<text v-if="!query.end_date" class="placeholder f-14">选择日期</text>
								<text v-else>{{query.end_date}}</text>
							</picker>
						</com-form-item>
						<com-form-item label="申报来源" label-position="top">
							<view class="check-group">
								<radio-group class="check-list" @change="RadioChange($event,'source')">
									<label class="check-item" v-for="(item,index) in enums.source" :key="index">
										<radio class="radio-item" :checked="item.value==query.source" :value="item.value"></radio>
										{{item.name}}
									</label>
								</radio-group>
							</view>
						</com-form-item>
					</com-form>
					
					<!-- 底部按钮 -->
					<view class="btns flex">
						<view class="btn-item bg-gray padding" @click="formReset">重置</view>
						<view class="btn-item bg-orange padding" @click="formSubmit">确定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/* 
	 @props {Boolean} hideNav=[false|true]是否显示顶部导航栏
	 */
	import API from "@/mock/mock.js"
	import MescrollMixin from "@/components/com-mescroll-view/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		props:{
			hideNav:{
				type:Boolean,
				default:false
			},
			api:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				// 字典
				enums:{
					electron:[{ value: '0',name: '是'},{value: '1',name: '否'}],
					source:[{ value: '0',name: '网上登记'},{value: '1',name: '微信申报'}]
				},
				skeletonShow:true,
				drawerShow: false,
				query:{
					ent_name:'',
					code_num:'',
					is_electron:'',
					start_date:'',
					end_date:'',
					source:''
				},
				list:[],
				// 下拉刷新的配置
				downOption:{
					auto:true,//默认true
				},
				// 上拉加载的配置(可选)
				upOption: {
					auto: false,//默认true
					page: {
						size: 4 // 每页数据,默认10
					},
					noMoreSize: 4, // 列表的总数大于等于n条才显示'-- END --'的提示
					textNoMore:'-- 暂无更多内容--',
					empty: {
						// icon:'/static/image/nodata.png',
						tip: '暂无相关内容'
					}
				}
			}
		},
		async mounted() {
		},
		watch:{
			api(){
				this.downCallback()
			}
		},
		methods: {
			/*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				//实际请求
				this.$http({
					url:this.api,
					data:{page:page.num,rows:page.size,...this.query}
				});
				/*模拟接口*/
				const {data:res}=await API.apiPreList();
				if(page.num==1){this.list=[]};
				this.list=this.list.concat(res.results);
				this.mescroll.endBySize(res.results.length, res.page.totalnum);
				this.skeletonShow=false;
			},
			/* 跳转详情 */
			goDetail(item){
				let url='';
				switch(item.type){
					case 0:
						url='/pages/preApproval/preDetailEst/preDetailEst';
						break;
					case 1:
						url='/pages/preApproval/preDetailMod/preDetailMod';
						break;
					case 2:
						url='/pages/preApproval/preDetailNul/preDetailNul';
				};
				if(item.worker){
					uni.showModal({
						title:'提醒',
						content:`该业务已由${item.worker}预审!是否继续预审？`,
						success: (res) => {
							if(res.confirm){
								uni.navigateTo({
									url:url,
									animationType:'fade-in'
								})
							}
						}
					})
				}else{
					uni.navigateTo({
						url:url,
						animationType:'fade-in'
					})
				}
			},
			
			/* form表单 */
			DateChange(e,val) {
				this.query[val] = e.detail.value
			},
			RadioChange(e,val) {
				this.query[val] = e.detail.value;
			},
			formSubmit(){
				this.mescroll.resetUpScroll(true);
				this.hideDrawer()
			},
			formReset() {
				let emptyObj={ent_name:'',code_num:'',is_electron:'',start_date:'',end_date:'',source:''}
				Object.assign(this.query,emptyObj);
				this.mescroll.resetUpScroll(true);
				this.hideDrawer()
			},
			/* 侧滑菜单 */
			showDrawer() {
				this.drawerShow = true
			},
			hideDrawer() {
				this.drawerShow = false
			}
		}
	}
</script>

<style scoped lang="scss">
/* 布局 */	
page,.page-wrap{height: 100%;}
.page-wrap{
	display: flex;flex-direction: column;
	.main-wrap{
		flex: 1;
		overflow: hidden;
		position: relative;
	}
}	
/* 列表样式 */
.list{
	padding:0 30rpx;
	.list-item{
		background: #ffffff;border-radius: 12rpx;padding:0 30rpx;margin:30rpx 0;
		.header{
			padding: 24rpx 0;
			.left{font-size: 30rpx;}
			.right{line-height: normal}
		}
		.middle{
			padding: 24rpx 0;
		}
		.footer{
			padding: 24rpx 0;
			.left,.right{font-size: 26rpx;line-height: normal;}
		}
	}
}
/* 抽屉组件样式 */
/deep/ {
	.basis-lg{
		flex-basis: 75%;
	}
	.cu-dialog{
		background: #ffffff
	}
}
/* 查询表单 */
.query-area{
	height: 100%;
	.com-form-container{
		flex: 1;
		overflow:auto;
		padding-bottom: 30rpx;
	}
	.com-form-group{
		padding: 24rpx 36rpx 4rpx 36rpx;
		border:0 none;
		 /deep/{
			.title{
				padding:0;font-size: 28rpx!important;
			}
			.check-item{
				font-size: 28rpx!important
			}
			.form-input{
				border:1px solid #ddd;
				border-radius: 6rpx;
				padding: 0 20rpx;
				margin: 24rpx 0 0 0;
				font-size: 28rpx!important
			}
			.picker{
				border:1px solid #ddd;
				border-radius: 6rpx;
				padding: 11rpx 20rpx!important;
				margin: 24rpx 0 0 0;
			}
		}
	}
	
	.btns{
		.btn-item{
			flex: 1;
		}
	}
}
</style>
