<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">变更-材料-联络员信息</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}"></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container">
				<com-form ref="form" :label-style="{'flex-basis':'240rpx'}">
					<com-form-item label="姓名">
						<view class="info">{{liaison.name}}</view>
					</com-form-item>
					<com-form-item label="固定电话">
						<view class="info">{{liaison.telephone}}</view>
					</com-form-item>
					<com-form-item label="移动电话">
						<view class="info">{{liaison.mobile}}</view>
					</com-form-item>
					<com-form-item label="电子邮箱">
						<view class="info">{{liaison.email}}</view>
					</com-form-item>
					<com-form-item label="证件类型">
						<view class="info">{{enums.cardType[liaison.cardType].name}}</view>
					</com-form-item>
					<com-form-item label="证件号码">
						<view class="info">{{liaison.cardNum}}</view>
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
		props: {
			hideNav: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				skeletonShow: false,
				cityList: cityJson,
				// 字典表
				enums: {
					cardType: [{
						value: '0',
						name: '中华人民共和国居民身份证'
					}, {
						value: '1',
						name: '护照'
					}]
				},
				// 基本信息
				liaison: {
					name: '高桂长',
					telephone: '0531-85223126',
					mobile: '13842152245',
					email: 'jzda2517@163.com',
					cardType: '0',
					cardNum: '370123199010240015'
				}
			}
		},
		mounted() {},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">

</style>
