<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">设立-授权委托</block>
			<!-- <view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view> -->
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
		<!-- 	<view class="com-form-container">
				<com-form ref="form" :model="legal" :label-style="{'flex-basis':'240rpx'}">
					<com-form-item label="领照方式">
						<view>{{legal.method }}</view>
					</com-form-item>
					<com-form-item label="指定代表/委托代理人">
						<view>{{legal.name }}</view>
					</com-form-item>
					
					<com-form-item label="委托人证件信息:" label-position="top">
						<view >证件类型：{{legal.certificateType }}</view>
						<view >证件号码：{{legal.idNumber }}</view>
					</com-form-item>
					
					<com-form-item label="委托权限:" label-position="top">
						<view v-for="(item,index) in list" :key="index">
							<view class="middle solid-bottom">
								<view>{{item}}</view>
							</view>
						</view>
					</com-form-item>
					
					<com-form-item label="指定代表或委托代理人信息:" label-position="top">
						<view >固定电话：{{legal.telephone }}</view>
						<view >移动电话：{{legal.mobile }}</view>
					</com-form-item>
				</com-form>	
				<view class="text-orange margin-top padding bg-white solid-bottom">
					<text class="lg cuIcon-infofill padding-right-xs"></text>
					*注意：固定电话和移动电话必填一项！
				</view>
			</view> -->
			<!-- 内容区域 -->
				<view class="list">
					<view class="list-item">
						<view class="middle solid-bottom">
							<view class="">领照方式：{{legal.method}}</view>
							<view class="item text-cut">指定代表/委托代理人：{{legal.name }}</view>
						</view>
					</view>
					
					<view class="list-item">
						<view class="header justify-between align-center solid-bottom">
							<text class="cuIcon-title text-blue"></text>
							<text class="text-blue">委托人证件信息：</text>
						</view>
						<view class="middle solid-bottom">
							<view >证件类型：{{legal.certificateType }}</view>
							<view >证件号码：{{legal.idNumber }}</view>
						</view>
					</view>
					<view class="list-item">
						<view class="header justify-between align-center solid-bottom">
							<text class="cuIcon-title text-blue"></text>
							<text class="text-blue">委托权限：</text>
						</view>
						<view class="middle solid-bottom" style="padding: 0;">
							<view v-for="(item,index) in list" :key="index">
								<view class="middle solid-bottom">
									<view>{{item}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="list-item">
						<view class="header justify-between align-center solid-bottom">
							<text class="cuIcon-title text-blue"></text>
							<text class="text-blue">指定代表或委托代理人信息：</text>
						</view>
						<view class="middle solid-bottom" style="padding: 0;">
							<view >固定电话：{{legal.telephone }}</view>
							<view >移动电话：{{legal.mobile }}</view>
						</view>
					</view>
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
					method:'现场领照',
					name:'李伟',
					certificateType:'中华人民共和国居民身份证',
					idNumber:'370124197401063013',
					telephone:'0531-85223126',
					mobile:'13842152245',
				},
				list:['核对登记材料中的复印件并签署核对意见','修改企业自备文件的错误','修改有关表格的填写错误','领取营业执照和有关文书']
			}
		},
		mounted () {
			
		},
		methods: {
		
		}
	}
</script>

<style scoped lang="scss">
	/* 列表样式 */
		.list{
			padding:0 30rpx;
			.list-item{
				background: #ffffff;border-radius: 12rpx;padding:0 30rpx;margin:0rpx 0;
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
