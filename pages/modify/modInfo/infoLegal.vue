<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-材料-法定代表人</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container">
				<com-form ref="form" :label-style="{'flex-basis':'220rpx'}">
					<com-form-item label="姓名">
						<view class="info">{{legal.name}}</view>
					</com-form-item>
					<com-form-item label="固定电话">
						<view class="info">{{legal.telephone}}</view>
					</com-form-item>
					<com-form-item label="移动电话">
						<view class="info">{{legal.mobile}}</view>
					</com-form-item>
					<com-form-item label="电子邮箱">
						<view class="info">{{legal.email}}</view>
					</com-form-item>
					<com-form-item label="职务">
						<view class="info">{{enums.post[legal.post].name}}</view>
					</com-form-item>
					<com-form-item label="职务产生方式">
						<view class="info">{{enums.postWay[legal.postWay].name}}</view>
					</com-form-item>
					<com-form-item label="证件类型">
						<view class="info">{{enums.cardType[legal.cardType].name}}</view>
					</com-form-item>
					<com-form-item label="证件号码">
						<view class="info">{{legal.cardNum}}</view>
					</com-form-item>
					<com-form-item label="地址">
						<view class="info">{{legal.address}}</view>
					</com-form-item>
					<com-form-item label="任命单位">
						<view class="info">{{legal.company}}</view>
					</com-form-item>
					<com-form-item label="任职日期">
						<view class="flex flex-sub align-center">
							<view class="">
								<text class="padding-right-xs">自</text>
								<text class="info">{{legal.startDate}}</text>
							</view>
							<view class="">
								<text class="padding-right-xs padding-left-xs">至</text>
								<text class="info">{{legal.endDate}}</text>
							</view>
						</view>
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
					post:[{ value: '0',name: '执行董事兼经理'},{ value: '1',name: '集团母公司'},{ value: '2',name: '集团母公司'}],
					postWay:[{ value: '0',name: '选举'},{ value: '1',name: '公司内推'}],
					cardType:[{ value: '0',name: '中华人民共和国居民身份证'},{ value: '1',name: '护照'}]
				},
				// 基本信息
				legal:{
					name:'冯立国',
					telephone:'0531-85223126',
					mobile:'13842152245',
					email:'jzda2517@163.com',
					post:'0',
					postWay:'0',
					cardType:'0',
					cardNum:'370123199010240015',
					address:'山东省日照市莒县山东北路5号',
					company:'日照市市场监督管理局',
					startDate:'1990-02-10',
					endDate:'2020-12-31'
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
