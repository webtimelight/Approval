<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-材料-股东</block>
			<!-- <view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view> -->
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" ></com-quick-skeleton>
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" style="margin: 0;">
						<view class="header flex justify-between align-center solid-bottom">
							<view class="">（投资人）名称或姓名：{{v.name}}</view>
						</view>
						<view class="middle solid-bottom">
							<view class="item text-cut">投资人类型：{{v.typeInvestor}}</view>
							<view class="item text-cut">认缴出资额(万元)：{{v.money}}</view>
							<view class="item text-cut">认缴出资比例(%)：{{v.proportion}}</view>
							<view class="item text-cut">出资时间：{{v.time}}</view>
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
						typeInvestor:'自然人股东',
						name:'刘长青',
						money:'600',
						time:'2020-12-1',
						proportion:'12%',
					},{
						typeInvestor:'自然人股东',
						name:'齐贵峰',
						money:'600',
						time:'2020-12-1',
						proportion:'12%',
					},{
						typeInvestor:'自然人股东',
						name:'周敏',
						money:'600',
						time:'2020-12-1',
						proportion:'12%',
					},
					{
						typeInvestor:'自然人股东',
						name:'王文利',
						money:'600',
						time:'2020-12-1',
						proportion:'12%',
					},
					{
						typeInvestor:'自然人股东',
						name:'赵传兴',
						money:'2600',
						time:'2020-12-1',
						proportion:'52%',
					},
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
