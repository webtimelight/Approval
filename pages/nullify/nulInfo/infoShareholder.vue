<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-材料-委托授权</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container">
				<com-form ref="form" :label-style="{'flex-basis':'400rpx'}">
					<com-form-item label="指定代表/委托代理人">
						<view class="info">{{author.name}}</view>
					</com-form-item>
				</com-form>	
				
				<!-- 委托权限 -->
				<view class="cu-bar bg-white solid-bottom ">
					<view class="action">
						<text class="cuIcon-title text-orange"></text>
						<text class="text-orange">委托权限</text>
					</view>
				</view>
				<view class="lim-list flex-sub bg-white">
					<view class="lim-list-item flex justify-between solid-bottom padding" v-for="(v,i) in author.lim" :key="i">
						<view class="left flex-sub padding-right">
							{{v.type}}
						</view>
						<view class="right padding-left" :class="v.value==0?'text-green':'text-red'">
							{{enums.radio[v.value].name}}
						</view>
					</view>
				</view>
				
				<!-- 委托人信息 -->
				<view class="cu-bar bg-white solid-bottom ">
					<view class="action">
						<text class="cuIcon-title text-orange"></text>
						<text class="text-orange">指定代表或委托代理人信息</text>
					</view>
				</view>
				<com-form ref="form" :label-style="{'flex-basis':'240rpx'}">
					<com-form-item label="证件类型">
						<view class="info">{{enums.cardType[author.cardType].name}}</view>
					</com-form-item>
					<com-form-item label="证件号码">
						<view class="info">{{author.cardNum}}</view>
					</com-form-item>
					<com-form-item label="固定电话">
						<view class="info">{{author.telephone}}</view>
					</com-form-item>
					<com-form-item label="移动电话">
						<view class="info">{{author.mobile}}</view>
					</com-form-item>
				</com-form>	
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
				cityList:cityJson,
				// 字典表
				enums:{
					way:[{ value: '0',name: '现场领照'},{ value: '1',name: '邮寄'}],
					radio:[{ value: '0',name: '同意'},{ value: '1',name: '不同意'}],
					cardType:[{ value: '0',name: '中华人民共和国居民身份证'},{ value: '1',name: '护照'}]
				},
				// 授权信息
				author:{
					way:'0',
					name:'张玉华',
					cardType:'0',
					cardNum:'370123199010240015',
					telephone:'0531-85223126',
					mobile:'13842152245',
					lim:[
						{type:'核对登记材料中的复印件并签署核对意见',value:'0'},
						{type:'修改企业自备文件的错误',value:'0'},
						{type:'修改有关表格的填写错误',value:'0'},
						{type:'领取营业执照和有关文书',value:'1'}
					]
				}
			}
		},
		mounted () {
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">

</style>
