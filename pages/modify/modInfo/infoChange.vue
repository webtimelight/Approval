<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-申请书-变更事项</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container">
				<com-form>
					<!-- 名称 -->
					<view class="com-form-group-list">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">名称变更</text>
							</view>
						</view>
						<com-form-item label="变更前" >
							<view class="info">{{oldInfo.entName}}</view>
						</com-form-item>
						<com-form-item label="变更后">
							<view class="info">{{newInfo.entName}}</view>
						</com-form-item>
					</view>
					<!-- 联系电话 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">联系电话变更</text>
							</view>
						</view>
						<com-form-item label="变更前" >
							<view class="info">{{oldInfo.phone}}</view>
						</com-form-item>
						<com-form-item label="变更后">
							<view class="info">{{newInfo.phone}}</view>
						</com-form-item>
					</view>
					<!-- 经营范围 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">经营范围变更</text>
							</view>
						</view>
						<com-form-item label="变更前" class="align-self">
							<view class="info">{{oldInfo.nature}}</view>
						</com-form-item>
						<com-form-item label="变更后" class="align-self">
							<view class="info">{{newInfo.nature}}</view>
						</com-form-item>
					</view>
					<!-- 其他菜单项中 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">法定代表人变更</text>
							</view>
							<view class="action text-gray f-12">
								申请书菜单查看
							</view>	
						</view>
					</view>	
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">股东（发起人）变更</text>
							</view>
							<view class="action text-gray f-12">
								申请书菜单查看
							</view>	
						</view>
					</view>	
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">董事变更</text>
							</view>
							<view class="action text-gray f-12">
								申请书菜单查看
							</view>	
						</view>
					</view>	
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">监事变更</text>
							</view>
							<view class="action text-gray f-12">
								申请书菜单查看
							</view>	
						</view>
					</view>	
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">经理变更</text>
							</view>
							<view class="action text-gray f-12">
								申请书菜单查看
							</view>	
						</view>
					</view>	
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">联络员变更</text>
							</view>
							<view class="action text-gray f-12">
								申请书菜单查看
							</view>	
						</view>
					</view>
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">财务负责人变更</text>
							</view>
							<view class="action text-gray f-12">
								申请书菜单查看
							</view>	
						</view>
					</view>
					
				</com-form>
			</view>	
		</view>
	</view>
</template>

<script>
	/*
	 @props {Boolean} hideNav=[false|true]是否显示顶部导航栏
	 */
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
				oldInfo:{
					entName:'山东纵横电子商务有限公司',
					phone:'18640902512',
					nature:'软件设计与开发、游戏开发、系统集成、网络工程、企业信息化、网站设计与开发、网页制作、电子商务、通信系统开发集成、自动化控制系统开发与集成、自动化工程、软件销售、技术支持、技术服务、技术培训。'
				},
				newInfo:{
					entName:'济南纵横电商有限公司',
					phone:'15040902518',
					nature:'软件设计与开发、游戏开发、系统集成、网络工程、企业信息化、网站设计与开发、网页制作'
				}
			}
		},
		mounted () {
		},
		methods: {
		}
	}
</script>

<style  lang="scss">
	/deep/ .align-self .title-group{
		align-self: flex-start;
		padding-top: 20rpx;
	}
</style>
