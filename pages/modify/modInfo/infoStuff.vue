<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-提交材料</block>
		</cu-custom>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 列表骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="list"></com-quick-skeleton>
			<!-- 列表 -->
			<view class="list">
				<view class="list-item" v-for="(v,i) in doc" :key="i" >
					<view class="header flex justify-between align-center solid-bottom">
						<view class="left">
							<block v-if="v.has==0">
								<text class="f-16 cuIcon-roundcheckfill margin-right-sm text-green"></text>
								<text class="text-green">已提交</text>
							</block>	
							<block v-else>
								<text class="f-16 cuIcon-roundclosefill margin-right-sm text-orange"></text>
								<text class="text-orange">未提交</text>
							</block>
						</view>
						<view class="right cu-tag bg-green radius" v-if="v.has==0">预览</view>
					</view>
					<view class="middle solid-bottom">
						<view class="item align-start flex">
							{{v.name}}
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
				// 字典
				enums:{
				},
				skeletonShow:false,
				doc:[
					{name:'《公司登记（备案）申请书》',has:'0'},
					{name:'《指定代表或者共同委托代理人授权委托书》及指定代表或委托代理人的身份证件复印件',has:'0'},
					{name:'法律、行政法规和国务院决定规定公司变更事项必须报经批准的，提交有关的批准文件或者许可证件复印件',has:'1'},
					{name:'关于修改公司章程的决议、决定（变更登记事项涉及公司章程修改的，提交该文件；其中股东变更登记无须提交该文件，公司章程另有规定的，从其规定）',has:'0'},
					{name:'修改后的公司章程或者公司章程修正案（公司法定代表人签署）',has:'0'},
					{name:'变更事项相关证明文件',has:'0'},
					{name:'公司营业执照副本',has:'0'},
					{name:'联络人身份证明',has:'0'},
					{name:'组织机构代码证',has:'0'},{name:'税务登记证',has:'0'}
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
