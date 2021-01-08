<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-许可经营</block>
			<!-- <view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view> -->
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" ></com-quick-skeleton>
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" style="margin: 0;">
						<view class="header justify-between align-center solid-bottom">
							<text class="cuIcon-title text-blue"></text>
							<text class="text-blue">许可证名称：</text>{{v.name}}
						</view>
						<view class="middle solid-bottom">
							<view class="item text-cut">许可文件编号：{{v.idNumber}}</view>
							<view class="item text-cut">许可内容：{{v.content}}</view>
							<view class="item text-cut">有效期限至：{{v.time}}</view>
							<view class="item text-cut">许可机关：{{v.office}}</view>
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
						name:'山东省某某小吃',
						idNumber:'35585A65DAS45325',
						content:'生产制作小吃',
						time:'2095-12-31',
						office:'山东省某某某',
					},
					{
						name:'山东省某某小吃',
						idNumber:'35585A65DAS45325',
						content:'生产制作小吃',
						time:'2095-12-31',
						office:'山东省某某某',
					},
					{
						name:'山东省某某小吃',
						idNumber:'35585A65DAS45325',
						content:'生产制作小吃',
						time:'2095-12-31',
						office:'山东省某某某',
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
