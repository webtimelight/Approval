<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-材料-人员信息</block>
		</cu-custom>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 列表骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="list"></com-quick-skeleton>
			<!-- 列表 -->
			<view class="list-wrap">
				<!-- 变更前 -->
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>
						<text class="text-blue">变更前</text>
					</view>
				</view>
				<view class="flat-list">
					<view class="list-item" v-for="(v,i) in list" :key="i" >
						<view class="header flex justify-between align-center solid-bottom" @click="showMore('list',i)">
							<view class="left text-cut">
								<text class="margin-right">{{v.name}}</text>
								<text class="cu-tag line-green radius">{{enums.post[v.post].name}}</text>
							</view>
							<view class="text-center f-14 text-gray flex align-center">
								<view v-if="v.show"><text class="lg text-gray cuIcon-fold"></text></view>
								<view v-else><text class="lg text-gray cuIcon-unfold"></text></view>
							</view>
						</view>
						<view class="middle solid-bottom" v-if="v.show">
							<view class="item text-cut flex justify-between align-center">
								<text class="text-gray">证件类型</text>
								<text>{{enums.cardType[v.cardType].name}}</text>
							</view>
							<view class="item text-cut flex justify-between align-center">
								<text class="text-gray">证件号码</text>
								<text>{{v.cardNum}}</text>
							</view>
							<view class="item text-cut flex justify-between align-center">
								<text class="text-gray">移动电话</text>
								<text>{{v.mobile}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 变更后 -->
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="cuIcon-title text-orange"></text>
						<text class="text-orange">变更后</text>
					</view>
				</view>
				<view class="flat-list">
					<view class="list-item" v-for="(v,i) in newList" :key="i" >
						<view class="header flex justify-between align-center solid-bottom" @click="showMore('newList',i)">
							<view class="left text-cut">
								<text class="margin-right">{{v.name}}</text>
								<text class="cu-tag line-green radius">{{enums.post[v.post].name}}</text>
							</view>
							<view class="text-center f-14 text-gray flex align-center">
								<view v-if="v.show"><text class="lg text-gray cuIcon-fold"></text></view>
								<view v-else><text class="lg text-gray cuIcon-unfold"></text></view>
							</view>
						</view>
						<view class="middle solid-bottom" v-if="v.show">
							<view class="item text-cut flex justify-between align-center">
								<text class="text-gray">证件类型</text>
								<text>{{enums.cardType[v.cardType].name}}</text>
							</view>
							<view class="item text-cut flex justify-between align-center">
								<text class="text-gray">证件号码</text>
								<text>{{v.cardNum}}</text>
							</view>
							<view class="item text-cut flex justify-between align-center">
								<text class="text-gray">移动电话</text>
								<text>{{v.mobile}}</text>
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
					post:[{ value: '0',name: '监事'},{ value: '1',name: '经理'},{ value: '2',name: '执行董事'}],
					cardType:[{ value: '0',name: '中华人民共和国居民身份证'},{ value: '1',name: '护照'}]
				},
				skeletonShow:false,
				list:[{
					name:'陈旭峰',
					post:'0',
					cardType:'0',
					cardNum:'370108197803184837',
					mobile:'15165012939'
				},{
					name:'黄贤安',
					post:'1',
					cardType:'0',
					cardNum:'370108197803184837',
					mobile:'15865012932'
				},{
					name:'沈杰',
					post:'2',
					cardType:'0',
					cardNum:'370108197803184837',
					mobile:'15165012939'
				}],
				newList:[{
					name:'陈旭峰',
					post:'0',
					cardType:'0',
					cardNum:'370108197803184837',
					mobile:'15165012939'
				},{
					name:'黄贤安',
					post:'1',
					cardType:'0',
					cardNum:'370108197803184837',
					mobile:'15865012932'
				},{
					name:'沈杰',
					post:'2',
					cardType:'0',
					cardNum:'370108197803184837',
					mobile:'15165012939'
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
