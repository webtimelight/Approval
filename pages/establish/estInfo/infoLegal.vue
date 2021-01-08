<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-材料-法定代表人</block>
			<!-- <view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view> -->
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container">
				<com-form ref="form" :model="legal" :label-style="{'flex-basis':'240rpx'}">
					<com-form-item label="姓名:">
						<view>{{legal.name }}</view>
					</com-form-item>
					<com-form-item label="证件类型:">
						<view>{{legal.certificateType }}</view>
					</com-form-item>
					<com-form-item label="证件号码:">
						<view>{{legal.cardNum }}</view>
					</com-form-item>
					<com-form-item label="固定电话:">
						<view>{{legal.telephone }}</view>
					</com-form-item>
					<com-form-item label="移动电话:">
						<view>{{legal.mobile }}</view>
					</com-form-item>
					<com-form-item label="地址:">
						<view>{{legal.address }}</view>
					</com-form-item>
					<com-form-item label="电子邮箱:">
						<view>{{legal.email }}</view>
					</com-form-item>
					<com-form-item label="职务:">
						<view>{{legal.duty }}</view>
					</com-form-item>
					<com-form-item label="职务产生方式:">
						<view>{{legal.producingMethod }}</view>
					</com-form-item>
					<com-form-item label="任命单位:">
						<view>{{legal.company }}</view>
					</com-form-item>
					<com-form-item label="任职日期:">
						<view>自:{{legal.startDate}} 至: {{legal.endDate}}</view>
					</com-form-item>
				</com-form>	
				<view class="text-orange margin-top padding bg-white solid-bottom">
					<text class="lg cuIcon-infofill padding-right-xs"></text>
					*注意：固定电话和移动电话必填一项！
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
				legal:{
					name:'冯立国',
					telephone:'0531-85223126',
					mobile:'13842152245',
					email:'jzda2517@163.com',
					duty:'执行董事兼经理',
					producingMethod:'选举',
					certificateType:'中华人民共和国居民身份证',
					cardNum:'370123199010240015',
					address:'山东省日照市莒县山东北路5号',
					company:'日照市市场监督管理局',
					startDate:'1990-02-10',
					endDate:'2020-12-31'
				},
				
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
