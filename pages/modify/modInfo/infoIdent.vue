<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-人员实名认证</block>
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
								<text class="cu-tag round" :class="v.adopt=='0'?'bg-green':'line-red'">{{enums.adopt[v.adopt].name}}</text>
							</view>
							<view class="text-center f-14 text-gray flex align-center">
								<view v-if="v.show"><text class="lg text-gray cuIcon-fold"></text></view>
								<view v-else><text class="lg text-gray cuIcon-unfold"></text></view>
							</view>
						</view>
						<view class="middle solid-bottom" v-if="v.show">
							<block v-if="v.adopt==0">
								<view class="item text-cut flex justify-between align-center">
									<text class="text-gray">证件类型</text>
									<text>{{enums.cardType[v.cardType].name}}</text>
								</view>
								<view class="item text-cut flex justify-between align-center">
									<text class="text-gray">证件号码</text>
									<text>{{v.cardNum}}</text>
								</view>
								<view class="item text-cut flex justify-between align-center">
									<text class="text-gray">人员类型</text>
									<text>{{v.type}}</text>
								</view>
							</block>
							<view v-else class="text-gray f-12">
								已过认证失效日期：请确认“登记注册身份验证APP”办理企业登记注册截止日期是否大于当前日期！
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
			}
		},
		data() {
			return {
				showDetail:false,
				// 字典
				enums:{
					adopt:[{ value: '0',name: '已认证'},{ value: '1',name: '认证失败'}],
					cardType:[{ value: '0',name: '中华人民共和国居民身份证'},{ value: '1',name: '护照'}]
				},
				skeletonShow:false,
				list:[{
					name:'陈旭峰',
					adopt:'0',
					cardType:'0',
					cardNum:'370108197803184837',
					type:'法定代表人,执行董事'
				},{
					name:'黄贤安',
					adopt:'1',
					cardType:'0',
					cardNum:'370108197803184837',
					type:'法定代表人,执行董事'
				},{
					name:'沈杰',
					adopt:'0',
					cardType:'0',
					cardNum:'370108197803184837',
					type:'法定代表人,执行董事'
				}]
			}
		},
		async mounted() {
			this.list.forEach(item=>{
				return this.$set(item,'show',true)
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
	padding:10rpx 30rpx;
	// background-color: #ffffff;
	.list-item{
		background: #ffffff;padding:0 30rpx;margin: 0 0 30rpx 0;
		border-radius: 12rpx;
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
