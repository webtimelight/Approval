<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">注销-提交材料</block>
			<!-- <view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view> -->
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" ></com-quick-skeleton>
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" style="margin: 0 0 30rpx 0;">
						<view class="header justify-between align-center solid-bottom">
							<text class="f-16 cuIcon-newsfill margin-right-sm text-orange"></text>
							<text>{{v.title}}</text>
						</view>
						<view class="middle solid-bottom">
							<view class="item text-gray">文件页数：{{v.page}}</view>
							<view class="item text-gray">文件起始页：{{v.homePage}}</view>
							<view class="item text-gray">文件结束页：{{v.endPage}}</view>
							<view class="item text-gray">是否提交：{{v.whether}}</view>
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
						title:'《公司登记（备案）申请书》',
						page:'',
						homePage:'',
						endPage:'',
						whether:'是',
					},{
						title:'《指定代表或者共同委托代理人授权委托书》及指定代表或委托代理人的身份证件复印件。',
						page:'',
						homePage:'',
						endPage:'',
						whether:'是',
					},{
						title:'住所使用证明',
						page:'',
						homePage:'',
						endPage:'',
						whether:'是',
					},{
						title:'《企业名称预先核准通知书》',
						page:'',
						homePage:'',
						endPage:'',
						whether:'是',
					}
					
				]
				
			}
		},
		mounted () {
			
		},
		
		methods: {
			
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
