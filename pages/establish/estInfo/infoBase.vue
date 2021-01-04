<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom v-if="!hideNav" class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">预审-材料-基本信息</block>
			<view slot="right" class="ope flex align-center" @click="save"><text class="icon fa fa-save"></text>保存</view>
		</cu-custom>
		<!-- 主体区域 -->
		<view class="main-wrap">
			<!-- 详情骨架 -->
			<com-quick-skeleton :show="skeletonShow" bgColor="#f6f6f6" loading="flush" template="detail" :style="{'top':hideNav?'':CustomBar + 'px'}" ></com-quick-skeleton>
			<!-- 内容区域 -->
			<view class="com-form-container">
				<com-form ref="form" :model="dataBase" :rules="rules" >
					<com-form-item label="企业名称" prop="entName">
						<input class="form-input" placeholder-class="placeholder" v-model="dataBase.entName" placeholder="请输入企业名称" />
						<view slot="extContent" class="flex align-center padding-top-xs padding-bottom-sm">
							<button class="cu-btn bg-blue shadow">名称查重</button>
							<view  class="padding-left text-orange f-14">名称来源：名称内网核准</view>
						</view>
					</com-form-item>
					<com-form-item label="名称预先登记文号" prop="regNum" label-position="top">
						<input class="form-input" placeholder-class="placeholder" v-model="dataBase.regNum" placeholder="请输入名称预先登记文号" />
					</com-form-item>
					<com-form-item label="是否集团母公司" prop="isParCompany" label-position="top">
						<view class="check-group">
							<radio-group class="check-list" @change="RadioChange($event,'isParCompany')">
								<label class="check-item" v-for="(item,index) in enums.radio" :key="index">
									<radio class="radio-item" :checked="item.value==dataBase.isParCompany" :value="item.value"></radio>
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</com-form-item>
					
					<com-form-item class="margin-top" label="住所">
						<view class="block-group">
							<view class="block-item" @click="handleTap('cityPicker')">
								<view class="placeholder picker" v-if="!dataBase.cityLabel">选择省-市-区</view>
								<view class="picker" v-else>{{dataBase.cityLabel}}</view>
								<com-picker ref="cityPicker"
								  v-model="dataBase.cityValue"
								  mode="multiSelector"
								  :column-num="6"
								  :list="cityList"
								  :level="3"
								  :dataset="{ name: 'cityLabel' }"
								  @change="handleChange"
								  @confirm="handleConfirm"
								  @cancel="handleCancel">
								</com-picker>
							</view>
							<view class="block-item">
								<input class="form-input" placeholder-class="placeholder" v-model="dataBase.address" placeholder="填写详细地址(乡/村/门牌号)" ></input>
							</view>
						</view>
					</com-form-item>
					<com-form-item label="详细地址">
						<input class="form-input" placeholder-class="placeholder" v-model="dataBase.addressDetail" placeholder="请输入详细地址" />
						<view slot="extContent" class="flex align-center padding-top-xs padding-bottom-sm">
							<button class="cu-btn bg-blue shadow">地址查重</button>
							<view  class="padding-left text-orange f-14">查重结果：地址无重复</view>
						</view>
					</com-form-item>
					<view class="text-orange margin-top padding bg-white solid-bottom">
						按照山东省高法和省市场监督管理局联合印发的《关于推进市场主体法律文书送达地址承诺确认工作的实施意见》（鲁高法【2020】24）规定，您登记的此住所为依法确认的法律文书送达地址，请诚信填写准确的地址信息，以便能够及时接收法律文书，若因您提供的虚假地址或提供送达地址不准确，送达地址变更未及时更新，拒绝签收等导致无法及时有效接受文书而提出异议，法院不予支持。
					</view>
					<com-form-item label="法律文书送达地址" prop="address2" label-position="top">
						<view class="block-group">
							<view class="block-item" @click="handleTap('cityPicker2')">
								<view class="placeholder picker" v-if="!dataBase.cityLabel2">选择省-市-区</view>
								<view class="picker" v-else>{{dataBase.cityLabel2}}</view>
								<com-picker ref="cityPicker2"
								  v-model="dataBase.cityValue2"
								  mode="multiSelector"
								  :column-num="6"
								  :list="cityList"
								  :level="3"
								  :dataset="{ name: 'cityLabel2' }"
								  @change="handleChange"
								  @confirm="handleConfirm"
								  @cancel="handleCancel">
								</com-picker>
							</view>
							<view class="block-item">
								<input class="form-input" placeholder-class="placeholder" v-model="dataBase.address2" placeholder="填写详细地址(乡/村/门牌号)" ></input>
							</view>
						</view>
					</com-form-item>
					<com-form-item label="详细地址">
						<input class="form-input" placeholder-class="placeholder" v-model="dataBase.addressDetail2" placeholder="请输入详细地址" />
						<view slot="extContent" class="flex align-center padding-top-xs padding-bottom-sm">
							<button class="cu-btn bg-blue shadow" @click="dataBase.addressDetail2=dataBase.addressDetail">与住所一致</button>
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
					radio:[{ value: '0',name: '集团母公司'},{value: '1',name: '集团子公司（集团成员）'},{value: '2',name: '参股公司'}],
				},
				// 基本信息
				dataBase:{
					entName:'山东智华小商品有限公司',
					regNum:'（鲁）登记私名预核字[2017]第02484号',
					isParCompany:'0',
					cityValue: ["370000","370100","370102"],//默认值
					cityLabel:'',
					address:'东风街道36号',
					addressDetail:'济南市历下区后宰门街36-1号',
					/* 法律文书 */
					cityValue2:[],//默认值
					cityLabel2:'',
					address2:'',
					addressDetail2:'',
				},
				// 表单验证
				rules:{
					entName:[
						{required: true,message: '企业名称不能为空'}
					],
					regNum:[
						{required: true,message: '名称预先登记文号不能为空'}
					],
					isParCompany:[
						{required: true,message: '是否集团母公司为必选项'}
					],
					entName:[
						{required: true,message: '企业名称不能为空'}
					],
					address:[
						{required: true,message: '住所不能为空'}
					],
					address2:[
						{required: true,message: '法律文书送达地址不能为空'}
					]
				}
			}
		},
		mounted () {
		  this.$nextTick(() => {
		    // 调用getColumnsInfo方法获取默认值的选项信息,进行回填
		    const cityInfo = this.$refs.cityPicker.getColumnsInfo(this.dataBase.cityValue);
		    const cityInfo2 = this.$refs.cityPicker2.getColumnsInfo(this.dataBase.cityValue2);
		    this.dataBase.cityLabel = cityInfo.item?cityInfo.item.map(m => m.label).join('-'):'';
		    this.dataBase.cityLabel2 = cityInfo2.item?cityInfo2.item.map(m => m.label).join('-'):'';
		  })
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
			//单选
			RadioChange(e,val) {
				this.dataBase[val] = e.detail.value;
			},
			//多列选择器
			handleTap (picker) {
			  this.$refs[picker].show()
			},
			handleChange (e) {
			  console.log('change::', e)
			},
			handleConfirm (e) {
			  // 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
			  console.log('confirm::', e)
			  if (e) {
			    const name = e.dataset.name
			    const label = e.item.map(m => m.label).join('-')
			    if (name && label) {
			       this.dataBase[name] = label;
			    }
			  }
			  console.log(this.dataBase.cityLabel)
			},
			handleCancel (e) {
			  console.log('cancel::', e)
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
