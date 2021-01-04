<template>
	<view class="">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">表单编辑</block>
		</cu-custom>
		<!-- 表单 -->
		<view class="com-form-container">
			<com-form :hide-required-asterisk="hideRequiredAsterisk" ref="form" :model="info" :rules="rules">
				<!-- =======【1只展示信息】==== -->
				<com-form-item label="非编辑：">
					<view class="info">非编辑只展示信息（常用）</view>
				</com-form-item>
				
				<!-- =======【2默认左右结构】左边标题，右边value==== -->
				<com-form-item label="左右：" prop="name">
					<input class="form-input" placeholder-class="placeholder" v-model="info.name" placeholder="最常用的左右结构,左侧图标可选" />
				</com-form-item>
				
				<!-- =======【3默认左右结构】左边标题，中间value，右边按钮==== -->
				<com-form-item label="左中右：" :label-style="{'flex-basis':'200rpx'}">
					<view slot="titleLeft"><text class="cuIcon-locationfill text-orange margin-right-xs f-20"></text></view>
					<input class="form-input" placeholder-class="placeholder" placeholder="常用的左中右结构" />
					<text class="icon text-orange cuIcon-questionfill margin-left-sm" style="font-size: 40rpx;"></text>
				</com-form-item>
				
				<!-- =======【4默认左右结构】标题左右有图标或内容，标题栏宽度定义样式宽度==== -->
				<com-form-item label="标题左右："  :label-style="{'flex-basis':'350rpx'}">
					<view slot="titleLeft"><text class="cuIcon-title text-orange"></text></view>
					<view slot="titleRight">
						<button class="cu-btn bg-blue shadow round">按钮</button>
					</view>	
					<input class="form-input" placeholder-class="placeholder" placeholder="标题有左右内容宽度样式" />
				</com-form-item>
				
				<!-- =======【5上下结构】上边标题，下边value=== -->
				<com-form-item label="标题栏在上方独行显示：" label-position="top">
					<input class="form-input" placeholder-class="placeholder"  placeholder="最常用的上下结构" />
				</com-form-item>
				
				<!-- =======【6上下结构】标题左右有图标或内容==== -->
				<com-form-item label="自定义验证(手机)：" prop="phone" label-position="top">
					<!-- 标题区域 -->
					<view slot="titleRight">
						<button class="cu-btn bg-green shadow round margin-right-xs">选择</button>
						<button class="cu-btn bg-orange shadow round">意见暂存</button>
					</view>
					<!-- value区域 -->
					<textarea class="textarea" :maxlength="2000" placeholder-class="placeholder"  v-model="info.phone" placeholder="上下结构,标题左中右:左侧图标-标题-右侧按钮"></textarea>
				</com-form-item>
				
				<!-- =======【7单选按钮组】==== -->
				<com-form-item label="单选：" prop="sex" label-position="top">
					<view class="check-group">
						<radio-group class="check-list" @change="RadioChange($event,'sex')">
							<label class="check-item" v-for="(item,index) in enums.radio" :key="index">
								<radio class="radio-item" :checked="item.value==info.sex" :value="item.value"></radio>
								{{item.name}}
							</label>
						</radio-group>
					</view>
				</com-form-item>
				
				<!-- =======【8多选按钮组】==== -->
				<com-form-item label="多选：">
					<view class="check-group">
						<checkbox-group class="check-list" @change="checkboxChange($event,'nation')">
					        <label class="check-item" v-for="(item,index) in enums.checkbox" :key="index">
					            <view class="checkbox-icon">
					                <checkbox :value="item.value" :checked="info.nation.includes(item.value)" />
					            </view>
					            <view class="checkbox-text">{{item.name}}</view>
					        </label>
					    </checkbox-group>
					</view>	
				</com-form-item>
				
				<!-- ==========【9picker选择器】======== -->
				<com-form-item label="选择器：">
					<picker  class="picker" mode="date" @change="DateChange($event,'time')">
						<text class="value" v-if="info.time">{{info.time}}</text>
						<text v-else class="placeholder">选择日期</text>
					</picker>
				</com-form-item>
				
				<!-- =======【10多行显示】==== -->
				<com-form-item label="地址：">
					<view class="block-group">
						<view class="block-item">
							<view class="info">
								显示文字信息非编辑
							</view>
						</view>
						<view class="block-item">
							<input class="form-input" placeholder-class="placeholder" placeholder="填写详细地址(乡/村/门牌号)" ></input>
						</view>
					</view>
				</com-form-item>
				
				
				<!-- =======【11分组加标题】==== -->
				<view class="com-form-group-list margin-top">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>
							<text class="text-blue">住所</text>
						</view>
						<text class="icon text-orange cuIcon-questionfill f-20"></text>
					</view>
					<com-form-item label="原登记" >
						<view class="read-only">
							济南电商有限公司
						</view>
					</com-form-item>
					<com-form-item label="变更申请">
						<input class="form-input" placeholder-class="placeholder" value="济南电商有限公司" placeholder="" />
						<view slot="extContent" class="flex align-center padding-top-xs padding-bottom-sm">
							<button class="cu-btn bg-blue shadow">名称查重</button>
							<view  class="padding-left text-orange f-14">名称来源：名称内网核准</view>
						</view>
					</com-form-item>
				</view>
				
				<view class="com-form-group-list margin-top-sm">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>
							<text class="text-blue">住所</text>
						</view>
						<text class="icon text-orange cuIcon-questionfill f-20"></text>
					</view>
					<com-form-item label="原登记" >
						<view class="read-only">
							济南电商有限公司
						</view>
					</com-form-item>
					<com-form-item label="变更申请">
						<input class="form-input" placeholder-class="placeholder" />
					</com-form-item>
				</view>
				
				<!-- =======【12利用slot="formItem"完全自定义表单项内容】==== -->
				<!-- <com-form-item prop="sex">
					<template slot="formItem">
						<view class="customize-form-item">
							<view class="customize-form-item__label">完全自定义内容（性别）：</view>
							<radio-group @change="sexChange">
								<label class="customize-form-item__radio" v-for="item in sexes" :key="item.value">
									<view>
										<radio :value="item.value" :checked="item.value === info.sex" />
									</view>
									<view class="customize-form-item__radio__text">{{item.name}}</view>
								</label>
							</radio-group>
						</view>
					</template>
				</com-form-item> -->
			</com-form>
		</view>
		
		<button @click="save" class="cu-btn lg block bg-blue margin">保存（com-form组件内方法）</button>
		<button @click="promiseSave" class="cu-btn lg block bg-orange margin">promise保存</button>
		<button @click="asyncSave" class="cu-btn lg block bg-brown margin">async await保存</button>
		<button @click="utilsSave" class="cu-btn lg block bg-red margin">保存（asyncValidate工具验证）</button>
		
		
		<!-- =======【13动态增减表单项验证】==== -->
		<view class="form-wrap">
			<com-form ref="dynamicForm" :hide-required-asterisk="hideRequiredAsterisk" :model="dynamicInfo" :rules="dynamicRules" :label-style="{'flex-basis':'260rpx'}">
				<com-form-item v-if="showRuleParam" label="prop-rules" prop="test1">
					<input class="form-input" placeholder-class="placeholder" v-model="dynamicInfo.test1" placeholder="通过prop使用rule规则验证" />
				</com-form-item>
				<com-form-item v-if="showRequiredParam" label="行内required" prop="test2" required message="行内required校验">
					<input class="form-input" placeholder-class="placeholder" v-model="dynamicInfo.test2" placeholder="行私有required和message验证" />
				</com-form-item>
				<!-- 动态联系人 start-->
				<block v-for="(contact,index) in dynamicInfo.list" :key="index">
					<com-form-item required :message="`请输入第${index+1}个联系人姓名`" :label="`联系人${index+1}`" :prop="'list.' + index + '.name'">
						<input class="form-input" placeholder-class="placeholder" v-model="contact.name" placeholder="请输入姓名" />
					</com-form-item>
					<com-form-item label="rules手机号：" :prop="'list.' + index + '.phone'"  :rules="mobileRules" >
						<input class="form-input" placeholder-class="placeholder" v-model="contact.phone" placeholder="行私有rules规则验证" />
					</com-form-item>
					<com-form-item label="职务：" :prop="'list.' + index + '.duty'" required :message="`请输入第${index+1}个联系人职务`">
						<input class="form-input" placeholder-class="placeholder" v-model="contact.duty" placeholder="请输入职务" />
					</com-form-item>
					<button @click="deleteContact(index)" class="cu-btn bg-brown margin">删除联系人</button>
				</block>
				<!-- 动态联系人 end-->
			</com-form>
		</view>
		
		<button @click="addContact" class="cu-btn lg block bg-blue margin">新增联系人</button>
		<button @click="toggleRuleParam" class="cu-btn lg block bg-orange margin">显-隐 prop-rules</button>
		<button @click="toggleRequiredParam" class="cu-btn lg block bg-green margin">显-隐 行内required</button>
		<button @click="dynamicSave" class="cu-btn lg block bg-red margin">表单校验</button>
	</view>
</template>

<script>
	import asyncValidate from '@/utils/async-validator'  
	const CONTACT_INFO={
		name:'',
		phone:'',
		duty:''
	}
	export default {
		data() {
			return {
				hideRequiredAsterisk: false,
				// 字典
				enums:{
					radio:[{ value: '0',name: '集团母公司'},{value: '1',name: '集团子公司（集团成员）'},{value: '2',name: '参股公司'}],
					checkbox:[{ value: '0',name: '美国'},{value: '1',name: '中国'},{value: '2',name: '巴西'}]
				},
				// 表单的内容必须初始化
				info: {
					name: '',
					phone: '',
					sex: '0',
					nation:[],
					time:'',
					time2:''
				},
				rules: {
					name: [
						{required: true,message: '请输入姓名'}
					],
					phone: [{
						required: true,
							message: '请输入手机号'
						},{
							validator: (rule, value, callback) => {
								// 注意这里如果用的是methods里的isMobilePhone将不生效
								if (this.$rules.isMobilePhone(value)) {
									callback()
								} else {
									callback(new Error('手机号格式不正确'))
								}
							}
						}
						// 或者这样也是可以的
						// {
						// 	validator: this.isMobile
						// }
					],
					sex: {
						required: true,
						message: '请选择性别'
					}
				},
				
				// 动态信息
				dynamicInfo:{
					test1:'',
					test2:'',
					list:[{...CONTACT_INFO}]
				},
				dynamicRules:{
					test1:[{required:true,message:'prop-rule规则校验'},{min:4,max:8,message:'prop-rule必须4-8位'}],
					duty:{required:true,message:'请输入职务信息'}
				},
				// 注意这里由于小程序的缘故正则表达式需要通过string的方式传递并且去除两边的斜杠，中间的斜杠变成两个斜杠
				mobileRules:[{required:true,message:'请输入手机号'},{pattern:'^1\\d{10}$',message:'手机号格式不正确'}],
				
				showRuleParam:true,
				showRequiredParam:true
			}
		},
		mounted() {
			// 小程序支持需要setRules方法初始化rules，不能通过props的:rules
			this.$refs.form.setRules(this.rules);
		},
		methods: {
			// picker选择器
			DateChange(e,val) {
				this.info[val] = e.detail.value
			},
			// 多选
			checkboxChange(e,val) {
				this.info[val]= e.detail.value;
			},
			//单选
			RadioChange(e,val) {
				this.info[val] = e.detail.value;
			},
			
			save() {
				this.$refs.form.validate((res) => {
					if (res) {
						uni.showToast({
							title: '验证通过'
						})
					}
				})
			},
			promiseSave(){
				this.$refs.form.validate().then((res)=>{
					uni.showToast({
						title: '验证通过'
					})
				}).catch(()=>{
				})
			},
			async asyncSave(){
				try{
					const result=await this.$refs.form.validate()
					if(result){
						uni.showToast({
							title: '验证通过'
						})
					}
				} catch(e){
					console.log(e)
				}
			},
			utilsSave() {
				asyncValidate.validate(this.info, this.rules, (res, errors) => {
					if (res) {
						uni.showToast({
							title: '验证通过'
						})
					}
				})
			},
			isMobile(rule, value, callback) {
				if (this.$rules.isMobilePhone(value)) {
					callback()
				} else {
					callback(new Error('手机号格式不正确'))
				}
			},
			sexChange(e) {
				this.info.sex = e.detail.value
			},
			addContact(){
				this.dynamicInfo.list.push({...CONTACT_INFO})
			},
			deleteContact(index){
				this.dynamicInfo.list.splice(index,1)
			},
			toggleRuleParam(){
				this.showRuleParam=!this.showRuleParam
			},
			toggleRequiredParam(){
				this.showRequiredParam=!this.showRequiredParam
			},
			dynamicSave(){
				this.$refs.dynamicForm.validate((res)=>{
					if(res){
						uni.showToast({
							title: '验证通过'
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>
