<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-后置审批</block>
		</cu-custom>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 列表骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="list"></com-quick-skeleton>
			<!-- 列表 -->
			<view class="list">
				<view class="list-item flex align-center" v-for="(v,i) in licence" :key="i" >
					<view class="list-left flex-sub">
						<view class="middle solid-bottom">
							<view class="item align-start flex">
								<text class="f-16 cuIcon-tagfill margin-right-sm text-blue"></text>
								<text>{{v.type}}</text>
							</view>
						</view>
						<view class="footer flex justify-between">
							<view class="item text-gray f-12">实施机关：{{v.dep}}</view>
						</view>
					</view>
					<view class="list-right margin-left text-center cu-tag radius" @click="del(i)">
						<text class="lg text-orange cuIcon-deletefill"></text>
					</view>
				</view>
				<view class="list-item">
					<view class="ope padding text-center">
						<text class="lg text-red cuIcon-roundadd padding-right f-18"></text>
						<text class="text-red">添加后置审批事项</text>
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
				},
				skeletonShow:false,
				licence:[
					{type:'农药生产企业开办审核',dep:'省经济和信息化委'},
					{type:'建设项目环境影响评价审批',dep:'省环保厅'},
					{type:'税务登记证',dep:'省住房城乡建设厅'}
				]
			}
		},
		async mounted() {
		},
		methods: {
			// 删除后置审批项
			del(i){
				uni.showModal({
					title:'删除提醒',
					content:`确定要删除此审批项吗？`,
					success: (_res) => {
						if(_res.confirm){
							console.log('删除逻辑')
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
/* 布局 */	
page,.page-wrap{height: 100%;}
	
/* 列表样式 */
.list{
	padding:30rpx 30rpx 30rpx 30rpx;
	.list-item{
		background: #ffffff;border-radius: 12rpx;padding:0 30rpx;margin:0 0 30rpx 0;
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
