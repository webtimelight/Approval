<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">注销-申请书-注销信息</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 企业基本信息 -->
			<view class="form-wrap">
				<view class="cu-bar">
					<view class="action">
						<text class="cuIcon-title text-orange"></text>
						<text class="text-orange">企业基本信息</text>
					</view>
				</view>
				<com-form>
					<com-form-item label="注册号">
						<view class="info">{{entInfo.regNum}}</view>
					</com-form-item>
					<com-form-item label="统一社会信用代码">
						<view class="info">{{entInfo.code}}</view>
					</com-form-item>
					<com-form-item label="企业名称">
						<view class="info">{{entInfo.entName}}</view>
					</com-form-item>
					<com-form-item label="负责人">
						<view class="info">{{entInfo.manager}}</view>
					</com-form-item>
					<com-form-item label="企业类型">
						<view class="info">{{entInfo.entType}}</view>
					</com-form-item>
					<com-form-item label="注册资本">
						<view class="info">{{entInfo.money}}</view>
					</com-form-item>
					<com-form-item label="住所">
						<view class="info">{{entInfo.address}}</view>
					</com-form-item>
					<com-form-item label="成立日期">
						<view class="info">{{entInfo.creatDate}}</view>
					</com-form-item>
					<com-form-item label="营业期限至">
						<view class="info">{{entInfo.dueDate}}</view>
					</com-form-item>
					<com-form-item label="登记机关">
						<view class="info">{{entInfo.regCom}}</view>
					</com-form-item>
					<com-form-item label="档案号">
						<view class="info">{{entInfo.fileNumber}}</view>
					</com-form-item>
					
				</com-form>	
			</view>
			<!-- 注销信息 -->
			<view class="form-wrap form-nul-info">
				<view class="cu-bar">
					<view class="action">
						<text class="cuIcon-title text-orange"></text>
						<text class="text-orange">注销信息</text>
					</view>
				</view>
				
				<com-form ref="form" :model="nulInfo">
					<com-form-item label="清算组备案通知文号">
						<view class="info">{{nulInfo.number}}</view>
					</com-form-item>
					<com-form-item label="清算组成员">
						<view class="info">{{nulInfo.member}}</view>
					</com-form-item>
					<com-form-item label="清算组负责人">
						<view class="info">{{nulInfo.principal}}</view>
					</com-form-item>
					<com-form-item label="注销原因" >
						<view class="info">{{nulInfo.cause}}</view>
					</com-form-item>
					<com-form-item label="清税情况">
						<view class="info">{{nulInfo.tax}}</view>
					</com-form-item>
					<com-form-item label="债权债务清理情况">
						<view class="info">{{nulInfo.debt}}</view>
					</com-form-item>
					<com-form-item label="公告报纸名称">
						<view class="info">{{nulInfo.newspaper}}</view>
					</com-form-item>
					<com-form-item label="公告日期">
						<view class="info">{{nulInfo.time}}</view>
					</com-form-item>
					<com-form-item label="对外投资清理情况">
						<view class="info">{{nulInfo.investment}}</view>
					</com-form-item>
					<com-form-item label="分公司注销登记情况">
						<view class="info">{{nulInfo.register}}</view>
					</com-form-item>
					<com-form-item label="缴回公章情况">
						<view class="info">{{nulInfo.cachet}}</view>
					</com-form-item>
					<com-form-item label="注销说明" label-position="top">
						<view class="info">{{nulInfo.des}}</view>
						<!-- <textarea class="textarea" :maxlength="2000" placeholder-class="item-placeholder"  v-model="nulInfo.des" placeholder="请填写审批意见"></textarea> -->
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
				// 企业基本信息
				entInfo:{
					regNum:3701002904654,
					code:913701007521810510,
					entName:'山东鼎盛装饰有限公司',
					entType:'有限责任公司分公司(自然人投资或控股)',
					manager:'陈麟',
					address:'济南市历下区花园东路36号',
					creatDate:'1999-12-30',
					regCom:'济南市市场监督管理局',
					money:'5000万元',
					dueDate:'2090-12-31',
					fileNumber:'3701002827138'
				},
				// 注销信息
				nulInfo:{
					number:'(济)登记内备字[2019]第000289号',
					member:'滕燕霞、张述明',
					principal:'滕燕霞',
					cause:'其他原因',
					tax:'已经清理完毕 ',
					newspaper:'XXXXXX',
					time:'2020-12-31',
					investment:'已清理完毕',
					register:'已清理完毕 ',
					cachet:'已缴回',
					debt:'债务清理完结',
					reason:'其他原因',
					des:'该公司成立以来，一直未发生经营活动'
				},
			}
		},
		mounted () {
		},
		methods: {
			
		}
	}
</script>

<style  lang="scss">
</style>
