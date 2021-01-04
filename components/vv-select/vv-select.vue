<template>
	<!-- v-model -->
	
	<!-- 使用组件 -->
	<!-- <vvSelect placeholder="请选择所属类别" :list="categorys" label="name" valueKey="id" @change="pickerChange"></vvSelect> -->
	
	<picker :ref="refName" @change="bindPickerChange"
		:value="index"
		:range="list"
		:range-key="label">
		<slot />
		<view v-if="isText" class="info-input">{{checkLabel ? checkLabel : placeholder}}</view>
		<view v-else>
			<view>
				<text class="info-input" v-if="checkLabel">{{checkLabel}}</text>
				<text class="info-input" v-else>{{placeholder}}</text>
			</view>
		</view>
	</picker>
</template>

<script>

	/**
	 * vv-select 选择
	 * @description picker再封装
	 * @property {String} valueKey 绑定的key
	 * @property {String} label 绑定的label
	 * @property {Array} list 数据
	 * @event {Function} change 
	 */

	export default {
		name: 'vv-select',
		props: {
			refName: {
				type: String,
				default: 'vvSelect'
			},
			value: {
				type: [String,Number]
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			valueKey: {
				type: String,
				default: 'id'
			},
			label: {
				type: String,
				default: 'name'
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			isText: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				index: 0,
				checkLabel: ''
			}
		},
		watch: {
			value: {
				handler: function(newVal) {
					if(this.value) {
						this.checkItemByKey(this.value);
					} else {
						this.$emit('change','');
					}
				},
				// immediate: true,
				// deep:true//对象内部的属性监听，也叫深度监听
			}
		},
		created() {
			// 首次选中
		},
		methods: {
			checkItemByKey: function(key,type) {
				// var index = this.list.findIndex((item,i)=> {return item[this.valueKey] == key});
				// // 首次找索引
				// index >= 0 && this.checkItemByIndex(index);
				
				var checkItem = this.list.find((item,i)=> {return item[this.valueKey] == key});
				console.log(checkItem);
				if(!checkItem) return;
				this.checkLabel = checkItem[this.label]; // 值
				this.$emit('change',checkItem[this.valueKey])
				
			},
			checkItemByIndex: function(index) {
				this.index = index;
				var checkItem = this.list.find((item,i)=> {return i == this.index});
				this.checkLabel = checkItem[this.label]; // 值
				// 返回这个值到父级
				// this.$emit('change',checkItem[this.valueKey])
				this.$emit('input',checkItem[this.valueKey]);
				// this.$emit('on-change',checkItem[this.valueKey])
			},
			bindPickerChange: function(e) {
				this.checkItemByIndex(e.target.value);
			}
		}
	}
</script>
<style lang="scss" scoped>
	
</style>
