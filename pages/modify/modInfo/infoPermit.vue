<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-材料-许可信息</block>
		</cu-custom>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 列表骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="list"></com-quick-skeleton>
			<!-- 列表 -->
			<com-mescroll-view ref="mescrollRef" @init="mescrollInit" :fixed="false" height="auto" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
				<view class="list">
					<view class="list-item" v-for="(v,i) in list" :key="i" >
						<view class="middle solid-bottom">
							<view class="item text-cut">许可文件编号：{{v.num}}</view>
							<view class="item text-cut">许可文件名称：{{v.name}}</view>
							<view class="item text-cut">许可机关：{{v.office}}</view>
						</view>
						<view class="footer flex justify-between">
							<view class="right text-blue text-center flex-sub">查看详情</view>
						</view>
					</view>
				</view>
			</com-mescroll-view>
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
					process:[{ value: '0',name: '受理'},{value: '1',name: '核准'}],
					post:[{ value: '0',name: '监事'},{ value: '1',name: '经理'},{ value: '2',name: '执行董事'}],
					cardType:[{ value: '0',name: '中华人民共和国居民身份证'},{ value: '1',name: '护照'}]
				},
				skeletonShow:true,
				list:[],
				// 下拉刷新的配置
				downOption:{
					auto:true,//默认true
				},
				// 上拉加载的配置(可选)
				upOption: {
					auto: false,//默认true
					page: {
						size: 4 // 每页数据,默认10
					},
					noMoreSize: 4, // 列表的总数大于等于n条才显示'-- END --'的提示
					textNoMore:'-- 暂无更多内容--',
					empty: {
						// icon:'/static/image/nodata.png',
						tip: '暂无相关内容'
					}
				}
			}
		},
		async mounted() {
		},
		methods: {
			/*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				//实际请求
				/* this.$http({
					url:this.api,
					data:{page:page.num,rows:page.size,...this.query}
				}); */
				/*模拟接口*/
				const {data:res}=await API.apiPerList();
				if(page.num==1){this.list=[]};
				this.list=this.list.concat(res.results);
				this.mescroll.endBySize(res.results.length, res.page.totalnum);
				this.skeletonShow=false;
			}
		}
	}
</script>

<style scoped lang="scss">
/* 布局 */	
page,.page-wrap{height: 100%;}
.page-wrap{
	display: flex;flex-direction: column;
	.main-wrap{
		flex: 1;
		overflow: hidden;
		position: relative;
	}
}	
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
