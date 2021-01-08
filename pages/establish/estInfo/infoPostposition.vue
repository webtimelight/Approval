<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-后置审批</block>
			<!-- <view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view> -->
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" ></com-quick-skeleton>
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" style="margin: 0;">
						<view @click="select">
							<view class="header justify-between align-center solid-bottom">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">审批事项名称：</text>{{v.name}}
							</view>
							<view class="middle solid-bottom">
								<view class="item ">实施机关：{{v.office}}</view>
								<view class="item ">是否证照分离项：{{v.whether}}</view>
							</view>
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
						name:'新建棉花加工企业审批',
						office:'省发展改革委',
						whether:'否',
					},{
						name:'农药生产企业开办审核',
						office:'省经济和信息化委',
						whether:'否',
					},{
						name:'无线电台（站）设置审批',
						office:'设区市以上地方人民政府经济和信息化部门',
						whether:'否',
					},{
						name:'无线电台（站）设置审批',
						office:'设区市、县（市、区）级人民政府公安部门',
						whether:'否',
					},{
						name:'农药生产企业开办审核',
						office:'省经济和信息化委',
						whether:'否',
					},{
						name:'无线电台（站）设置审批',
						office:'设区市以上地方人民政府经济和信息化部门',
						whether:'否',
					},{
						name:'无线电台（站）设置审批',
						office:'设区市、县（市、区）级人民政府公安部门',
						whether:'否',
					}
					
				]
				
			}
		},
		mounted () {
			
		},
		methods: {
			select(){
				
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
