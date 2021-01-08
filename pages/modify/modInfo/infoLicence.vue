<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-材料-多证合一</block>
		</cu-custom>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 列表骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="list"></com-quick-skeleton>
			<!-- 列表 -->
			<view class="list">
				<view class="list-item" v-for="(v,i) in licence" :key="i" >
					<view class="middle solid-bottom">
						<view class="item align-start flex">
							<text class="f-16 cuIcon-newsfill margin-right-sm text-blue"></text>
							<text>{{v.type}}</text>
						</view>
					</view>
					<view class="footer flex justify-between">
						<view class="item text-gray f-12">所属部门：{{v.dep}}</view>
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
					{type:'税务登记证',dep:'税务部门'},
					{type:'公章刻制备案',dep:'公安部门'},
					{type:'单位办理住房公积金缴存登记',dep:'住建部门'},
					{type:'成立体育经营实体或变更名称、场所、法定代表人、经营范围等的告知',dep:'体育部门'},
					{type:'税务登记证',dep:'税务部门'}
				]
			}
		},
		async mounted() {
		},
		methods: {
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
