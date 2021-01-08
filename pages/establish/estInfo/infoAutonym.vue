<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-人员实名认证</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" ></com-quick-skeleton>
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" style="margin:0 0 30rpx 0 ;">
						<view class="header flex justify-between align-center solid-bottom">
							<view class="left " style="background-color: #fff;">姓名：{{v.name}}</view>
							<view class="right cu-tag bg-green radius">{{v.personnelType}}</view>
						</view>
						<view class="middle solid-bottom" v-if="v.hinde">
							<view class="item text-gray f-14">证件类型：{{v.certificateType}}</view>
							<view class="item text-gray f-14">证件号码：{{v.idNumber}}</view>
							<view class="item text-gray f-14">人员类型：{{v.personnelType}}</view>
							<view class="item text-gray f-14">认证状态：{{v.authenticationType}}</view>
						</view>
						<view class="footer flex justify-between" @click="unfold(i)">
							<view class="right text-blue text-center flex-sub">查看详情</view>
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
				// 字典
				enums:{
					process:[{ value: '0',name: '受理'},{value: '1',name: '核准'}],
					post:[{ value: '0',name: '监事'},{ value: '1',name: '经理'},{ value: '2',name: '执行董事'}],
					cardType:[{ value: '0',name: '中华人民共和国居民身份证'},{ value: '1',name: '护照'}]
				},
				// 基本信息
				list:[
					{	
						hinde:false,
						name:'周敏',
						certificateType:'中华人民共和国居民身份证',
						idNumber:'370923197012291554',
						personnelType:'监事,自然人股东',
						authenticationType:'认证通过',
					},{
						hinde:false,
						name:'王文利',
						certificateType:'中华人民共和国居民身份证',
						idNumber:'370124197401063013',
						personnelType:'自然人股东',
						authenticationType:'认证通过',
					},{
						hinde:false,
						name:'李伟',
						certificateType:'中华人民共和国居民身份证',
						idNumber:'370124197401063013',
						personnelType:'授权委托人',
						authenticationType:'认证通过',
					},{
						hinde:false,
						name:'刘长青',
						certificateType:'中华人民共和国居民身份证',
						idNumber:'370124197401063013',
						personnelType:'执行董事兼总经理,自然人股东',
						authenticationType:'认证通过',
					}
					
				]
				
			}
		},
		mounted () {
			
		},
		methods: {
			unfold(i){
				this.list[i].hinde = !this.list[i].hinde;
			}
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
