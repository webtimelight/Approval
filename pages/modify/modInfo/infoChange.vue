<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-申请书-变更事项</block>
			<view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view>
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
								<text class="text-blue">名称</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" >
							<input disabled class="form-input" placeholder-class="placeholder" v-model="oldInfo.entName" placeholder="" />
						</com-form-item>
						<com-form-item label="变更申请">
							<input class="form-input" placeholder-class="placeholder" v-model="newInfo.entName" placeholder="填写企业名称" />
						</com-form-item>
					</view>
					<!-- 住所 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">住所</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" >
							<input disabled class="form-input" placeholder-class="placeholder" v-model="oldInfo.address" placeholder="" />
						</com-form-item>
						<com-form-item label="变更申请">
							<input class="form-input" placeholder-class="placeholder" v-model="newInfo.address" placeholder="填写企业住所" />
						</com-form-item>
					</view>
					<!-- 管辖机关 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">管辖机关</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" >
							<input disabled class="form-input" placeholder-class="placeholder" v-model="oldInfo.manCom" placeholder="" />
						</com-form-item>
						<com-form-item label="变更申请">
							<input class="form-input" placeholder-class="placeholder" v-model="newInfo.manCom" placeholder="填写管辖机关" />
						</com-form-item>
					</view>
					<!-- 属地监管工商所 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">属地监管工商所</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" >
							<input disabled class="form-input" placeholder-class="placeholder" v-model="oldInfo.supervise" placeholder="" />
						</com-form-item>
						<com-form-item label="变更申请">
							<input class="form-input" placeholder-class="placeholder" v-model="newInfo.supervise" placeholder="填写属地监管工商所" />
						</com-form-item>
					</view>
					<!-- 邮政编码 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">邮政编码</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" >
							<input disabled class="form-input" placeholder-class="placeholder" v-model="oldInfo.postNum" placeholder="" />
						</com-form-item>
						<com-form-item label="变更申请">
							<input class="form-input" placeholder-class="placeholder" v-model="newInfo.postNum" placeholder="填写邮政编码" />
						</com-form-item>
					</view>
					<!-- 联系电话 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">联系电话</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" >
							<input disabled class="form-input" placeholder-class="placeholder" v-model="oldInfo.phone" placeholder="" />
						</com-form-item>
						<com-form-item label="变更申请">
							<input class="form-input" placeholder-class="placeholder" v-model="newInfo.phone" placeholder="填写联系电话" />
						</com-form-item>
					</view>
					<!-- 注册资本 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">注册资本</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" >
							<input disabled class="form-input" placeholder-class="placeholder" v-model="oldInfo.capital" placeholder="" />
						</com-form-item>
						<com-form-item label="变更申请">
							<input class="form-input" placeholder-class="placeholder" v-model="newInfo.capital" placeholder="填写注册资本" />
						</com-form-item>
					</view>
					<!-- 企业类型 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">企业类型</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" >
							<input disabled class="form-input" placeholder-class="placeholder" v-model="oldInfo.entType" placeholder="" />
						</com-form-item>
						<com-form-item label="变更申请">
							<input class="form-input" placeholder-class="placeholder" v-model="newInfo.entType" placeholder="填写企业类型" />
						</com-form-item>
					</view>
					<!-- 经营范围 -->
					<view class="com-form-group-list margin-top-sm">
						<view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								<text class="text-blue">经营范围</text>
							</view>
							<text class="icon text-orange cuIcon-questionfill f-20"></text>
						</view>
						<com-form-item label="原登记" class="align-self">
							<textarea disabled class="textarea"  :maxlength="2000" placeholder-class="placeholder"  v-model="oldInfo.nature" placeholder=""></textarea>
						</com-form-item>
						<com-form-item label="变更申请" class="align-self">
							<textarea class="textarea" auto-height  :maxlength="2000" placeholder-class="placeholder"  v-model="newInfo.nature" placeholder="填写经营范围"></textarea>
						</com-form-item>
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
					address:'济南市市中区乐山小区121号',
					manCom:'济南市市中区市场监督管理局',
					supervise:'泉城路市场监督管理所',
					postNum:'250000',
					phone:'18640902512',
					capital:'11000',
					entType:'有限责任公司（自然人投资或控股）',
					nature:'软件设计与开发、游戏开发、系统集成、网络工程、企业信息化、网站设计与开发、网页制作、电子商务、通信系统开发集成、自动化控制系统开发与集成、自动化工程、软件销售、技术支持、技术服务、技术培训。'
				},
				newInfo:{
					entName:'济南纵横电商有限公司',
					address:'',
					manCom:'',
					supervise:'黑虎泉路市场监督管理所',
					postNum:'250000',
					phone:'15040902518',
					capital:'',
					entType:'有限公司',
					nature:''
				}
			}
		},
		mounted () {
		},
		methods: {
			save(){
				console.log(this.newInfo)
			}
		}
	}
</script>

<style  lang="scss">
	/deep/ .align-self .title-group{
		align-self: flex-start;
		padding-top: 20rpx;
	}
</style>
