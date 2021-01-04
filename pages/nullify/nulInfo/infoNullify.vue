<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">注销-申请书-注销信息</block>
			<view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view>
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
					<com-form-item label="企业类型">
						<view class="info">{{entInfo.entType}}</view>
					</com-form-item>
					<com-form-item label="负责人">
						<view class="info">{{entInfo.manager}}</view>
					</com-form-item>
					<com-form-item label="住所">
						<view class="info">{{entInfo.address}}</view>
					</com-form-item>
					<com-form-item label="成立日期">
						<view class="info">{{entInfo.creatDate}}</view>
					</com-form-item>
					<com-form-item label="登记机关">
						<view class="info">{{entInfo.regCom}}</view>
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
				
				<com-form ref="form" :model="nulInfo" :rules="rules" >
					<com-form-item label="注销原因" prop="reason">
						<input class="form-input" placeholder-class="placeholder" v-model="nulInfo.reason" placeholder="填写注销原因" />
						<text class="text-orange cuIcon-questionfill margin-left-sm f-20"></text>
					</com-form-item>
					<com-form-item label="清税情况" label-position="top">
						<view slot="titleRight">
							<button class="cu-btn bg-blue shadow round">重置</button>
						</view>
						<view class="check-group">
							<radio-group class="check-list" @change="RadioChange($event,'clearTax')">
								<label class="check-item" v-for="(item,index) in enums.clearTaxRadio" :key="index">
									<radio class="radio-item" :checked="item.value==nulInfo.clearTax" :value="item.value"></radio>
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</com-form-item>
					<com-form-item label="债权债务清理情况" label-position="top">
						<view class="check-group">
							<radio-group class="check-list" @change="RadioChange($event,'clearDebt')">
								<label class="check-item" v-for="(item,index) in enums.clearDebtRadio" :key="index">
									<radio class="radio-item" :checked="item.value==nulInfo.clearDebt" :value="item.value"></radio>
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</com-form-item>
					<com-form-item label="缴回公章情况" label-position="top">
						<view class="check-group">
							<radio-group class="check-list" @change="RadioChange($event,'backSeal')">
								<label class="check-item" v-for="(item,index) in enums.backSealRadio" :key="index">
									<radio class="radio-item" :checked="item.value==nulInfo.backSeal" :value="item.value"></radio>
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</com-form-item>
					<com-form-item label="注销说明" label-position="top">
						<textarea class="textarea" :maxlength="2000" placeholder-class="item-placeholder"  v-model="nulInfo.des" placeholder="请填写审批意见"></textarea>
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
				// 字典表
				enums:{
					clearTaxRadio:[{ value: '0',name: '已清理完毕'},{value: '1',name: '已清理完毕'}],
					clearDebtRadio:[{ value: '0',name: '主管部门或清算组织负责清理债权债务'},{value: '1',name: '债权清理完毕'}],
					backSealRadio:[{ value: '0',name: '已缴回'},{value: '1',name: '未缴回'}]
				},
				// 企业基本信息
				entInfo:{
					regNum:3701002904654,
					code:913701007521810510,
					entName:'山东鼎盛装饰有限公司',
					entType:'有限责任公司分公司(自然人投资或控股)',
					manager:'陈麟',
					address:'济南市历下区花园东路36号',
					creatDate:'1999-12-30',
					regCom:'济南市市场监督管理局'
				},
				// 注销信息
				nulInfo:{
					reason:'其他原因',
					clearTax:0,
					clearDebt:1,
					backSeal:0,
					des:'该公司成立以来，一直未发生经营活动'
				},
				//表单验证
				rules: {
					reason: [
						{required: true,message: '注销原因不能为空'}
					]
				}
			}
		},
		mounted () {
		},
		methods: {
			//单选
			RadioChange(e,val) {
				this.nulInfo[val] = e.detail.value;
			},
			// 保存
			save() {
				this.$refs.form.validate((res) => {
					if (res) {
						uni.showToast({
							title: '保存成功'
						})
					}
				})
			}
		}
	}
</script>

<style  lang="scss">
</style>
