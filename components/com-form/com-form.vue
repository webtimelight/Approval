<template>
	<view class="com-form-container">
		<slot></slot>
	</view>
</template>

<script>
	/* 
	 @props {Object}  :label-style="{flexBasis:300rpx;color:#f00}" 全局label标题样式 （优先级小于com-form-item行内同属性定义）
	 @props {String}  :label-position="left||top" 全局label标题位置，left默认为左右结构，top为上下结构（优先级小于com-form-item行内同属性定义）
	 @props {Object}  :model=""  表单数据对象
	 @props {Boolean} :hideRequiredAsterisk="[false||true]"  是否全局显示红色必填*号
	 @props {Boolean} :showMessage="[true||false]"  是否显示提示信息
	 @props {Object}  :rules=""  校验规则（优先级小于com-form-item行内同属性定义）
	 
	 @event {Function(callback: Function(boolean,errors:array))} validate 对整个表单的校验方法，参数为一个回调函数，传入两个参数，第一个表示校验是否通过，第二个为校验不同的字段及错误信息，如果没有传入回调函数，将返回一个promise
	 @event {Function(props:array ｜ string, callback: Function(boolean, errors:array))} validateFiled
	 
	 @event {Function}   rules:array，rules配置规则参考async-validator
	 
	 */
	import asyncValidate from '@/utils/async-validator'
	export default {
		name: 'EvanForm',
		props: {
			labelStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			labelPosition: {
				validator: function(value) {
					if (!value) {
						return true
					}
					return ['top', 'left'].indexOf(value) !== -1
				},
				default: 'left'
			},
			model: Object,
			hideRequiredAsterisk: {
				type: Boolean,
				default: false
			},
			showMessage: {
				type: Boolean,
				default: true
			},
			rules: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		provide() {
			return {
				evanForm: this
			}
		},
		computed: {
			// 整个form是否有*号，为了保证label对齐，而不是和*号对齐
			hasRequiredAsterisk() {
				if (this.hideRequiredAsterisk) {
					return false
				}
				if (this.mRules) {
					const values = Object.values(this.mRules)
					if (values && values.length > 0) {
						for (let i = 0; i < values.length; i++) {
							const value = values[i]
							if (Array.isArray(value) && value.length > 0) {
								const requiredItem = value.find((v) => v.required === true)
								if (requiredItem) {
									return true
								}
							} else {
								if (value && value.required) {
									return true
								}
							}
						}
					}
				}
				return this.childHasRequired
			}
		},
		watch: {
			rules: {
				immediate: true,
				deep: true,
				handler(value) {
					this.mRules = value || {}
				}
			}
		},
		data() {
			return {
				mRules: {},
				fields: [],
				childHasRequired: false
			}
		},
		methods: {
			setRules(rules) {
				this.mRules = rules || {}
			},
			async validate(callback) {
				const rules = this.getRules()
				if (typeof callback === 'function') {
					asyncValidate.validate(this.model, rules, callback, {
						showMessage: this.showMessage
					})
				} else {
					return await asyncValidate.validate(this.model, rules, callback, {
						showMessage: this.showMessage
					})
				}
			},
			async validateField(props, callback) {
				const rules = this.getRules()
				if (typeof callback === 'function') {
					asyncValidate.validateField(this.model, rules, props, callback, {
						showMessage: this.showMessage
					})
				} else {
					return await asyncValidate.validateField(this.model, rules, props, callback, {
						showMessage: this.showMessage
					})
				}
			},
			getRules() {
				const rules = {}
				this.fields.forEach((field) => {
					if (field.prop) {
						const requiredRules = field.required ? {
							required: true,
							message: field.message || `${field.label}必填`
						} : []
						const formRules = this.mRules && this.mRules[field.prop] ? this.mRules[field.prop] : []
						rules[field.prop] = [].concat(field.rules || formRules || []).concat(requiredRules)
					}
				})
				return rules
			}
		},
		created() {
			this.$on('evan.form.addField', (field) => {
				// 小程序中直接push field报错
				if (field.prop) {
					this.fields.push({
						rules: field.rules,
						prop: field.prop,
						required: field.required,
						label: field.label,
						message: field.message,
						_uid: field._uid
					})
					if (!this.childHasRequired) {
						if (field.required) {
							this.childHasRequired = field.required
							return
						}
						if (field.rules) {
							const fieldRules = [].concat(field.rules)
							fieldRules.forEach((item) => {
								if (item.required) {
									this.childHasRequired = true
								}
							})
						}
					}
				}
			})
			this.$on('evan.form.removeField', (field) => {
				this.fields.splice(this.fields.findIndex((item) => item._uid === field._uid), 1)
			})
		}
	}
</script>

<style scoped lang="scss">

</style>
