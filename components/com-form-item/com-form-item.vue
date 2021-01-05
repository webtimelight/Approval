<template>
	<view class="com-form-group">
		<slot name="formItem" v-if="$slots.formItem"></slot>
		<view v-else class="form-item"  :class="'label-'+mLabelPosition">
			<!-- 左==标题栏（左中右） -->
			<view class="title-group" :style="mLabelStyle">
				<view class="title-left">
					<slot name="titleLeft"></slot>
				</view>
				<view v-if="label" class="title" :class="{showAsteriskRect:hasRequiredAsterisk,isRequired:showRequiredAsterisk}"
				 >{{label}}</view>
				<view class="title-right">
					<slot name="titleRight"></slot>
				</view>
			</view>
			<!-- 右==内容区 -->
			<view class="value-group">
				<slot></slot>
			</view>
		</view>
		<!-- 与表单项同级顺序向下排列 -->
		<view class="ext-content">
			<slot name="extContent"></slot>
		</view>
	</view>
</template>

<script>
	/* 
	@props {String}  label="标题" 标签文本
	@props {String}  prop=""  表单域 model 字段
	@props {Object}  :label-style="{flexBasis:300rpx;color:#f00}" 行内label标题样式 ，优先级高
	@props {String}  :label-position="left||top" 行内label标题位置，left默认为左右结构，top为上下结构，优先级高
	
	@props {Boolean} :required="[false||true]"  是否必填
	@props {String}  message="XX为必填..."  配合required使用，当required为true时提示的校验错误信息,默认为 ${label}必填
	
	@props {Boolean} :hideRequiredAsterisk="[false||true]"  是否全局显示红色必填*号
	@props {Boolean} :showMessage="[true||false]"  是否显示提示信息
	@props {Object||Array}  :rules=""  校验规则，优先级高
	
	@slot  匿名  标签右侧的主内容区域
	@slot  slot="titleLeft"  label标题栏左侧内容
	@slot  slot="titleRight"  label标题栏左侧内容
	@slot  slot="extContent"  表单下方扩展内容
	
	@slot  slot="formItem"  完全自定义表单项里的内容，脱离该组件内的props
	
	 */
	export default {
		name: 'EvanFormItem',
		props: {
			label: String,
			prop: String,
			labelStyle: Object,
			labelPosition: {
				validator: function(value) {
					if (!value) {
						return true
					}
					return ['top', 'left'].indexOf(value) !== -1;
				},
				default:''
			},
			required: {
				type: Boolean,
				default: false
			},
			message: {
				type: String,
				default: ''
			},
			rules: {
				type: [Object, Array],
				default: null
			}
		},
		inject: ['evanForm'],
		computed: {
			mLabelStyle() {
				const parent = this.getParent()
				let labelStyle = Object.assign({}, (parent.labelStyle || {}), (this.labelStyle || {}))
				let arr = Object.keys(labelStyle).map((key) => `${key}:${labelStyle[key]}`)
				return arr.join(';')
			},
			mLabelPosition() {
				if (this.labelPosition) {
					return this.labelPosition
				}
				const parent = this.getParent()
				if (parent) {
					return parent.labelPosition
				}
				return 'left'
			},
			// 整个表单是否有*号
			hasRequiredAsterisk() {
				const parent = this.getParent()
				if (parent) {
					return parent.hasRequiredAsterisk
				}
				return false
			},
			// 当前formItem是否显示*号
			showRequiredAsterisk() {
				const parent = this.getParent()
				if (parent && parent.hideRequiredAsterisk) {
					return false
				}
				const rules = this.getRules()
				if (rules && rules.length > 0) {
					if (rules.find((rule) => rule.required === true)) {
						return true
					}
				}
				return this.required
			}
		},
		methods: {
			// 获取EvanForm组件
			getParent() {
				return this.evanForm
			},
			getRules() {
				let form = this.getParent()
				const formRules = form.mRules && form.mRules[this.prop] ? form.mRules[this.prop] : [];
				const selfRules = this.rules
				const requiredRules = this.required ? {
					required: true,
					message: this.message || `${this.label}必填`
				} : []
				return [].concat(selfRules || formRules || []).concat(requiredRules)
			}
		},
		created() {
			this.evanForm.$emit('evan.form.addField', this)
		},
		beforeDestroy() {
			this.evanForm.$emit('evan.form.removeField', this)
		}
	}
</script>

<style scoped lang="scss">
	.com-form-group{
		padding:16rpx 30rpx;
		background: #ffffff;
	}
	.com-form-group {
		border-bottom: 1rpx solid #eee;
	}
	.com-form-group[class*="margin"] {
		border-top:0 none;
	}
	/* placeholder颜色 */
	.com-form-group .placeholder
	{
		color:#c8c8c8;
		font-size: 30rpx;
	}
	
	/* 必填小星星 */
	.com-form-group .star{
		position: relative;
	}
	.com-form-group .star::after{
		content: '*';font-family:uniicons;
		font-weight:normal;
		color: #f00;line-height: 1.4;
		margin-right: 10rpx;
	}
	
	/* ----------默认左右结构------------- */
	.com-form-group .form-item{
		display:flex;flex-direction: row;flex-wrap: wrap;
		flex: 1;align-items: center;text-align: left;
	}
	/* 标题组 */
	.com-form-group .form-item .title-group{
		flex: 0 0 180rpx;
		display: flex;flex-direction: row;align-items: center;
		padding-right:30rpx;
	}
	
	.com-form-group .form-item .title-group .title{
		flex: 1;padding-right: 0;font-size: 30rpx;color:#888;line-height: 1.4;
	}
	.com-form-group .form-item .title-group .title.showAsteriskRect::after {
		content: '';
		font-family:uniicons;
		font-weight:normal;
		color: #f00;line-height: 1.4;
	}
	.com-form-group .form-item .title-group .title.isRequired::after {
		content: '*';margin-left: 10rpx;
	}
	
	.com-form-group .form-item .title-group .title-left{
		line-height: 1;
	}
	
	.com-form-group .form-item .title-group .title-right .icon{
		line-height: normal;
	}
	/* value组 */
	.com-form-group .form-item .value-group{
		flex: 1;
		display: flex;flex-direction: row;align-items: center;
	}
	
	
	/* -----------上下结构------------ */
	/* 标题组 */
	.com-form-group .form-item.label-top{
		display: block;
	}
	.com-form-group .form-item.label-top .title-group{
		display: flex;align-items: center;
		padding:10rpx 0 0 0;
	}
	.com-form-group .form-item.label-top .title-group .title{
		flex: 1;padding-right: 0;font-size: 30rpx;color:#888;line-height: 1.4;
	}
	
	/* value组 */
	.com-form-group .form-item.label-top .value-group{
		flex: 1;padding-left:0
	}
	
	/* ----------子组件样式----------- */
	
	.com-form-group .form-item .value-group /deep/{
		/* 输入框 */
		.form-input{
			text-align: left;
			line-height: 1.4;
			min-height: 80rpx;font-size: 30rpx;flex: 1;
		}
		/* 多文本 */
		.textarea{
			padding: 16rpx 0;width: 100%;font-size: 30rpx;flex: 1;
			min-height: 180rpx;
			
		}
		/* 单选和多选 */
		.check-group{
			padding: 10rpx 0;margin:0 -20rpx;flex: 1;
		}
		.check-list{
			display: flex;flex-wrap: wrap;
		}
		.check-item{
			padding: 10rpx 20rpx;
			display: flex;align-items: center;
		}
		/* radio和checkbox差异 */
		.radio-item{
			transform: scale(0.8);
			transform-origin:0 center;margin-right:10rpx;
		}
		.checkbox-icon{
			transform: scale(0.8);
			transform-origin:0 center;margin-right:10rpx;
		}
		/* 选中 */
		.uni-checkbox-input-checked{
			background-color: #007aff;border-color:#007aff;
		}
		
		/* picker选择器 */
		.picker{
			padding: 8px 0;line-height: 1.6;
		}
		.picker-group{
			width: 100%;
			margin: 0 -20rpx;
			.picker{
				margin: 0 20rpx;
			}
		}
		/* 多行 */
		.block-group{
			flex: 1;
		}
	}
</style>
