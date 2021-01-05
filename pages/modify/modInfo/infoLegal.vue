<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">变更-材料-法定代表人</block>
			<view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container">
				<com-form ref="form" :model="legal" :rules="rules" :label-style="{'flex-basis':'240rpx'}">
					<com-form-item label="姓名" prop="name">
						<input class="form-input" placeholder-class="placeholder" v-model="legal.name" placeholder="请填写法人姓名" />
					</com-form-item>
					<com-form-item label="固定电话" prop="telephone">
						<input class="form-input" placeholder-class="placeholder" v-model="legal.telephone" placeholder="请填写固定电话" />
					</com-form-item>
					<com-form-item label="移动电话" prop="mobile">
						<input class="form-input" placeholder-class="placeholder" v-model="legal.mobile" placeholder="请填写移动电话" />
					</com-form-item>
					<com-form-item label="电子邮箱" prop="email">
						<input class="form-input" placeholder-class="placeholder" v-model="legal.email" placeholder="请填写电子邮箱" />
					</com-form-item>
					<com-form-item label="职务" prop="post">
						<picker class="picker" @change="PickerChange($event,'post')" :range="enums.post" range-key="name">
							<text v-if="!enums.post[legal.post]" class="placeholder f-14">选择职务</text>
							<text v-else>{{enums.post[legal.post].name}}</text>
						</picker>
					</com-form-item>
					<com-form-item label="职务产生方式">
						<picker class="picker" @change="PickerChange($event,'postWay')" :range="enums.postWay" range-key="name">
							<text v-if="!enums.postWay[legal.postWay]" class="placeholder f-14">选择职务产生方式</text>
							<text v-else>{{enums.postWay[legal.postWay].name}}</text>
						</picker>
					</com-form-item>
					<com-form-item label="证件类型" prop="cardType">
						<picker class="picker" @change="PickerChange($event,'cardType')" :range="enums.cardType" range-key="name">
							<text v-if="!enums.cardType[legal.cardType]" class="placeholder f-14">选择证件类型</text>
							<text v-else>{{enums.cardType[legal.cardType].name}}</text>
						</picker>
					</com-form-item>
					<com-form-item label="证件号码" prop="cardNum">
						<input class="form-input" placeholder-class="placeholder" v-model="legal.cardNum" placeholder="请填写证件号码" />
					</com-form-item>
					<com-form-item label="地址">
						<input class="form-input" placeholder-class="placeholder" v-model="legal.address" placeholder="请填写地址" />
					</com-form-item>
					<com-form-item label="任命单位">
						<input class="form-input" placeholder-class="placeholder" v-model="legal.company" placeholder="请填写任命单位" />
					</com-form-item>
					<com-form-item label="任职日期" label-position="top">
						<view class="picker-group flex align-center justify-between">
							<picker class="picker flex-sub" mode="date" @change="PickerChange($event,'startDate')">
								<text class="padding-right">自:</text>
								<text class="value" v-if="legal.startDate">{{legal.startDate}}</text>
								<text v-else class="placeholder">选择开始日期</text>
							</picker>
							<picker class="picker flex-sub" mode="date" @change="PickerChange($event,'endDate')">
								<text class="padding-right">至:</text>
								<text class="value" v-if="legal.endDate">{{legal.endDate}}</text>
								<text v-else class="placeholder">选择结束日期</text>
							</picker>
						</view>
					</com-form-item>
				</com-form>	
				<view class="text-orange margin-top padding bg-white solid-bottom">
					<text class="lg cuIcon-infofill padding-right-xs"></text>
					说明：所有信息均为必填项，没有的请填写“无”。
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
				},
				// 表单验证
				rules:{
					name:[
						{required: true,message: '法人姓名不能为空'}
					],
					telephone:[
						{required: true,message: '固定电话不能为空'}
					],
					mobile:[
						{required: true,message: '移动电话不能为空'}
					],
					post:[
						{required: true,message: '请选择职务'}
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
