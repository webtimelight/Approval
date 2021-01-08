<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-材料-董事、监事、经理信息</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" ></com-quick-skeleton>
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" style="margin: 0 0 30rpx 0;">
						<view class="header flex justify-between align-center solid-bottom">
							<view class="">姓名：{{v.name}}</view>
						</view>
						<view class="middle solid-bottom">
							<view class="item text-gray">职务：{{v.duty}}</view>
							<view class="item text-gray">证件类型：{{v.certificateType}}</view>
							<view class="item text-gray">证件号码：{{v.idNumber}}</view>
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
				// 基本信息
				list:[
					{	
						name:'刘长青',
						certificateType:'中华人民共和国居民身份证',
						idNumber:'370923197012291554',
						duty:'执行董事兼总经理',
					},{
						name:'周敏',
						certificateType:'中华人民共和国居民身份证',
						idNumber:'370124197401063013',
						duty:'监事',
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
