<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">预审-设立-股东（发起人）</block>
		</cu-custom>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 列表骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="list"></com-quick-skeleton>
			<!-- 列表 -->
			<view class="list-wrap">
				<view class="flat-list">
					<view class="list-item" v-for="(v,i) in list" :key="i" >
						<view class="header flex justify-between align-center solid-bottom" @click="showMore('list',i)">
							<view class="left text-cut">
								<text class="margin-right">{{v.name}}</text>
								<text class="cu-tag line-green radius">{{enums.type[v.type].name}}</text>
							</view>
							<view class="text-center f-14 text-gray flex align-center">
								<view v-if="v.show"><text class="lg text-gray cuIcon-fold"></text></view>
								<view v-else><text class="lg text-gray cuIcon-unfold"></text></view>
							</view>
						</view>
						<view class="middle solid-bottom" v-if="v.show">
							<view class="h-grid  justify-between align-center">
								<view>
									<text class="text-gray f-14">股东（发起人）名称或姓名：</text>
								</view>
								<view>
									<text class="text-gray f-14">投资人类型：</text>
								</view>
								<view>
									<text class="text-gray f-14">证件类型：</text>
								</view>
								<view>
									<text class="text-gray f-14">证件号码：</text>
								</view>
								<view>
									<text class="text-gray f-14">认缴出资额（万元）：</text>
								</view>
								
								
								<!-- <view class="grid-item text-center">
									<view>
										<text class="text-red f-16 padding-right-xs">{{v.money}}</text>
										<text class="f-12">万元</text>
									</view>
									<view class="text-gray f-12">认缴出资额</view>
								</view>
								<view class="grid-item text-center">
									<view>
										<text class="text-red f-16 padding-right-xs">{{v.percent}}</text>
										<text class="f-12">%</text>
									</view>
									<view class="text-gray f-12">认缴出资比例</view>
								</view>
								<view class="grid-item text-center">
									<view>{{v.time}}</view>
									<view class="text-gray f-12">出资时间</view>
								</view> -->
							</view>
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
				showDetail:false,
				// 字典
				enums:{
					type:[{ value: '0',name: '自然人股东'},{ value: '1',name: '其他投资者'},{ value: '2',name: '非农民自然人'}],
				},
				skeletonShow:false,
				list:[{
					name:'陈旭峰',
					type:'0',
					money:'100',
					percent:'18',
					time:'2014-08-19'
				},{
					name:'黄贤安',
					type:'1',
					money:'50',
					percent:'42',
					time:'2014-08-19'
				}],
				newList:[{
					name:'陈旭峰',
					type:'0',
					money:'30',
					percent:'26',
					time:'2014-08-19'
				},{
					name:'黄贤安',
					type:'1',
					money:'110',
					percent:'12',
					time:'2014-08-19'
				},{
					name:'沈杰',
					type:'2',
					money:'30',
					percent:'42',
					time:'2014-08-19'
				}]
			}
		},
		async mounted() {
			this.list.forEach(item=>{
				return this.$set(item,'show',false)
			}),
			this.newList.forEach(item=>{
				return this.$set(item,'show',false)
			})
		},
		methods: {
			showMore(target,i){
				this[target][i].show=!this[target][i].show
			}
		}
	}
</script>

<style scoped lang="scss">
/* 布局 */	
page,.page-wrap{height: 100%;}
/* 列表样式 */
.flat-list{
	padding:0 30rpx;
	background-color: #ffffff;
	.list-item{
		background: #ffffff;padding:0;
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
