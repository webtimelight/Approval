<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-多证合一</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" ></com-quick-skeleton>
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" style="margin: 0 0 30rpx 0;">
						<view class="header justify-between align-center solid-bottom">
							<text class="f-16 cuIcon-newsfill margin-right-sm text-blue"></text>
							<text>{{v.itemName}}</text>
						</view>
						<view class="middle solid-bottom">
							<view class="item text-gray f-14">所属部门：{{v.department}}</view>
							<view class="item text-gray f-14">备注：{{v.remark}}{{v.department}}</view>
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
	import cityJson from '@/common/area-data-min.js'
	export default {
		props:{
			hideNav:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				skeletonShow:false,
				hide:true,
				// 基本信息
				list:[
					{	
						itemName:'税务登记证',
						department:'税务部门',
						remark:'信息采集',
					},{
						itemName:'公章刻制备案',
						department:'公安部门',
						remark:'信息采集',
					},{
						itemName:'单位办理住房公积金缴存登记',
						department:'住建部门',
						remark:'',
					},{
						itemName:'废旧金属收购业备案',
						department:'公安部门',
						remark:'',
					}
					
				]
				
			}
		},
		mounted () {
			
		},
		
		methods: {
			btn() {
				uni.navigateTo({
					url: "/pages/establish/estInfo/infoDetail"
				});
			},
		}
	}
</script>

<style scoped lang="scss">
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
</style>
