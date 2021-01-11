<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">预审-设立-基本信息</block>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container ">
				<com-form ref="form" :model="dataBase">
					<com-form-item label="企业名称">
						<view>{{dataBase.entName}}</view>
						<view slot="extContent" class="flex align-center padding-top-xs padding-bottom-sm">
							<button class="cu-btn bg-blue shadow">名称查重</button>
							<view  class="padding-left text-orange f-14">名称来源：名称内网核准</view>
						</view>
					</com-form-item>
					<com-form-item label="名称预先登记文号" label-position="top">
						<view>{{dataBase.regNum}}</view>
					</com-form-item>
					<com-form-item label="是否集团母公司">
						<view>{{dataBase.radio}}</view>
					</com-form-item>
					
					<com-form-item class="margin-top" label="住所">
						<view class="block-group">
							
							<view class="block-item">
								<view>{{dataBase.address1}}</view>
								<view>{{dataBase.address}}</view>
							</view>
						</view>
					</com-form-item>
					<com-form-item label="详细地址">
						<view>{{dataBase.addressDetail}}</view>
						<view slot="extContent" class="flex align-center padding-top-xs padding-bottom-sm">
							<button class="cu-btn bg-blue shadow">地址查重</button>
							<view  class="padding-left text-orange f-14">查重结果：地址无重复</view>
						</view>
					</com-form-item>
					<view class="text-orange margin-top padding bg-white solid-bottom">
						按照山东省高法和省市场监督管理局联合印发的《关于推进市场主体法律文书送达地址承诺确认工作的实施意见》（鲁高法【2020】24）规定，您登记的此住所为依法确认的法律文书送达地址，请诚信填写准确的地址信息，以便能够及时接收法律文书，若因您提供的虚假地址或提供送达地址不准确，送达地址变更未及时更新，拒绝签收等导致无法及时有效接受文书而提出异议，法院不予支持。
					</view>
					<com-form-item label="法律文书送达地址" label-position="top">
						<view class="block-group">
							<view>{{dataBase.address1}}</view>
							<view class="block-item">
								<view>{{dataBase.address2}}</view>
							</view>
						</view>
					</com-form-item>
					<com-form-item label="详细地址">
						<view>{{dataBase.addressDetail2}}</view>
						<view slot="extContent" class="flex align-center padding-top-xs padding-bottom-sm">
							<button class="cu-btn bg-blue shadow" @click="dataBase.addressDetail2=dataBase.addressDetail">与住所一致</button>
						</view>
					</com-form-item>
				</com-form>	
				
				<com-form :model="dataBase" ref="form" style="margin-top: 40rpx;">
						<com-form-item label="联系电话">
							<view>{{dataBase.mobile}}</view>
						</com-form-item>
						<com-form-item label="邮政编码">
							<view>{{dataBase.postalCode}}</view>
						</com-form-item>
						<com-form-item label="法定代表人姓名">
							<view>{{dataBase.legalName}}</view>
						</com-form-item>
						<com-form-item label="注册资本">
							<view>{{dataBase.registeredAssets}}</view>万元
						</com-form-item>
						<com-form-item label="实收资本">
							<view>{{dataBase.paidCapital}}</view>万元
						</com-form-item>
						<com-form-item label="公司类型">
							<view>{{dataBase.companyType}}</view>
						</com-form-item>
						<com-form-item label="设立方式">
							<view>{{dataBase.methodStablishment }}</view>
						</com-form-item>
						<com-form-item label="所属行业">
							<view>{{dataBase.industryInvolved }}</view>
						</com-form-item>
						<com-form-item label="行业代码">
							<view>{{dataBase.industryCode }}</view>
						</com-form-item>
						<com-form-item label="是否实缴">
							<view>{{dataBase.whetherPaid }}</view>
						</com-form-item>
						<com-form-item label="实缴类型"> 
							<view>{{dataBase.paidType }}</view>
						</com-form-item>
						<!-- <com-form-item label="经营范围" label-position="top"></com-form-item> -->
						<com-form-item label="经营范围规范用语：" label-position="top">
							<view>{{dataBase.specificationLanguage }}</view>
						</com-form-item>
						<com-form-item label="用户自主添加的经营范围：" label-position="top">
							<view>{{dataBase.businessScope }}</view>
						</com-form-item>
						<com-form-item label="营业期限">
							<view>{{dataBase.termOperation }}</view>
						</com-form-item>
						<com-form-item label="申请副本数">
							<view>{{dataBase.applyNum }}</view>
						</com-form-item>
						<com-form-item label="登记机关">
							<view>{{dataBase.registrationAuthority }}</view>
						</com-form-item>
						<com-form-item label="管辖机关">
							<view>{{dataBase.jurisdictionInstitution }}</view>
						</com-form-item>
						<com-form-item label="属地工商所">
							<view>{{dataBase.commerceAddress }}</view>
						</com-form-item>
						<com-form-item label="所属管片">
							<view>{{dataBase.commerceAddress1 }}</view>
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
				
				// 基本信息
				dataBase:{
					entName:'山东智华小商品有限公司',
					regNum:'（鲁）登记私名预核字[2017]第02484号',
					isParCompany:'0',
					isParCompanyTwo:'0',
					cityValue: ["370000","370100","370102"],//默认值
					cityLabel:'',
					address:'东风街道36号',
					address1:'山东省-济南市-历下区',
					addressDetail:'济南市历下区后宰门街36-1号',
					/* 法律文书 */
					cityValue2:[],//默认值
					cityLabel2:'',
					address2:'',
					addressDetail2:'',
					radio:'集团母公司',//是否集团母公司
					mobile:'15006409376',
					postalCode:'250000',//邮政编码
					legalName:'刘长青',//法人姓名
					registeredAssets:'5000',//注册资本
					paidCapital:'5000',//实收资金
					methodStablishment:'一般新设',//设立方式
					whetherPaid:'是',//是否实缴
					companyType:'有限责任公司(自然人投资或控股)',//公司类型
					industryInvolved:'农、林、牧、渔业',//所属行业
					industryCode:'  其他农业',//行业代码
					paidType:'商业银行',
					specificationLanguage:'',//规范用语
					businessScope:'计算机应用系统集成、网络设计、软件开发、维护。（依法须经批准的项目，经相关部门批准后方可开展经营活动）',//经营范围
					termOperation:'长期',//营业期限
					applyNum:'1',//申请副本数
					registrationAuthority:'济南市市场监督管理局',//登记机关
					jurisdictionInstitution:'济南市历下区市场监督管理局',//管辖机关
					commerceAddress:'文化东路市场监督管理所',//属地工商所
					commerceAddress1:'文化东路市场监督管理所',//所属管片
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
