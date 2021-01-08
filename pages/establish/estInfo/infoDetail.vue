<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-多证合一备注详情</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i">
						<view class="header flex justify-between align-center solid-bottom">
							<view class="title">财务负责人信息</view>
						</view>
						<view class="middle solid-bottom">
							<view class="">姓名：{{v.name}}</view>
							<view class="item text-cut">固定电话：{{v.telephone}}</view>
							<view class="item text-cut">移动电话：{{v.mobile}}</view>
							<view class="item text-cut">电子邮箱：{{v.email}}</view>
							<view class="item text-cut">证件类型：{{v.certificateType}}</view>
							<view class="item text-cut">证件号码：{{v.cardNum}}</view>
						</view>
						<view class="header flex justify-between align-center solid-bottom">
							<view class="title">其他信息</view>
						</view>
						<view class="middle solid-bottom">
							<view class="">从业人数：{{v.number}}</view>
							<view class="item text-cut">核算方式：{{v.accounting}}</view>
							<view class="item ">生产经营地：{{v.address1}}</view>
							<view class="item ">详细地址：{{v.address2}}</view>
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
						name:'冯立国',
						telephone:'0531-85223126',
						mobile:'13842152245',
						email:'jzda2517@163.com',
						certificateType:'中华人民共和国居民身份证',
						cardNum:'370123199010240015',
						number:'5人',
						accounting:'独立核算',
						address1:'山东省济南市历城区鲁能泰山12号楼1003室',
						address2:'山东省济南市历城区鲁能泰山12号楼1003室'
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
				padding: 8rpx 0;
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
	.title{
		font-size: 36rpx;
		font-weight: 700;
	}
</style>
