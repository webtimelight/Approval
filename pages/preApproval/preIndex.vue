<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">登记预审</block>
			<view slot="right" class="ope flex align-center padding" @click="doDrawer"><text class="icon cuIcon-filter"></text>筛选</view>
		</cu-custom>
		<!-- 选项卡 -->
		<com-scroll-tab :dataList="tabs" v-model="currentNav" activeColor="#0b8ffe"></com-scroll-tab>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 预审列表 -->
			<pre-list ref="yushenref" v-show="currentNav==0" hideNav api="/daiban"></pre-list>
			<!-- 已办列表 -->
			<pre-list ref="yibanref" v-show="currentNav==1"  hideNav api="/yiban"></pre-list>
		</view>
	</view>
</template>

<script>
	import preList from '@/pages/preApproval/preList'
	export default {
		components:{preList},
		data() {
			return {
				currentNav:0,
				tabs:['待办列表','已办列表']
			}
		},
		methods: {
			doDrawer(){
				let target=Object.keys(this.$refs)[this.currentNav]
				this.$refs[target].showDrawer()
			}
		}
	}
</script>

<style lang="scss">
/* 布局 */	
page,.page-wrap{height: 100%;}	
.page-wrap{
	display: flex;flex-direction: column;
	.main-wrap{
		flex: 1;
		overflow: hidden;
		position: relative;
	}
}
</style>
