<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-材料-联络员信息</block>
			<view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container">
				<com-form ref="form" :model="liaison" :rules="rules" :label-style="{'flex-basis':'240rpx'}">
					<com-form-item label="姓名" prop="name">
						<input class="form-input" placeholder-class="placeholder" v-model="liaison.name" placeholder="请填写法人姓名" />
					</com-form-item>
					<com-form-item label="固定电话">
						<input class="form-input" placeholder-class="placeholder" v-model="liaison.telephone" placeholder="请填写固定电话" />
					</com-form-item>
					<com-form-item label="移动电话" prop="mobile">
						<input class="form-input" placeholder-class="placeholder" v-model="liaison.mobile" placeholder="请填写移动电话" />
					</com-form-item>
					<com-form-item label="电子邮箱" prop="email">
						<input class="form-input" placeholder-class="placeholder" v-model="liaison.email" placeholder="请填写电子邮箱" />
					</com-form-item>
					<com-form-item label="证件类型" prop="cardType">
						<picker class="picker" @change="PickerChange($event,'cardType')" :range="enums.cardType" range-key="name">
							<text v-if="!enums.cardType[liaison.cardType]" class="placeholder f-14">选择证件类型</text>
							<text v-else>{{enums.cardType[liaison.cardType].name}}</text>
						</picker>
					</com-form-item>
					<com-form-item label="证件号码" prop="cardNum">
						<input class="form-input" placeholder-class="placeholder" v-model="liaison.cardNum" placeholder="请填写证件号码" />
					</com-form-item>
				</com-form>	
				<view class="text-orange margin-top padding bg-white solid-bottom">
					<text class="lg cuIcon-infofill padding-right-xs"></text>
					说明：1.此项为信用公示的登录信息。2.有红色<text class="text-red">*</text>标识的为必填项。
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
				cityList:cityJson,
				// 字典表
				enums:{
					cardType:[{ value: '0',name: '中华人民共和国居民身份证'},{ value: '1',name: '护照'}]
				},
				// 基本信息
				liaison:{
					name:'高桂长',
					telephone:'0531-85223126',
					mobile:'13842152245',
					email:'jzda2517@163.com',
					cardType:'0',
					cardNum:'370123199010240015'
				},
				// 表单验证
				rules:{
					name:[
						{required: true,message: '姓名不能为空'}
					],
					mobile:[
						{required: true,message: '移动电话不能为空'}
					],
					email:[
						{required: true,message: '电子邮箱不能为空'}
					],
					cardType:[
						{required: true,message: '请选择证件类型'}
					],
					cardNum:[
						{required: true,message: '证件号码不能为空'}
					]
				}
			}
		},
		mounted () {
		},
		methods: {
			// 保存
			save() {
				this.$refs.form.validate((res) => {
					if (res) {
						uni.showToast({
							title: '保存成功'
						})
					}
				})
			},
			//单列选择
			PickerChange(e,val) {
				this.legal[val] = e.detail.value
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
