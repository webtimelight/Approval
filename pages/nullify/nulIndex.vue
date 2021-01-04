<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">注销登记</block>
			<view slot="right" class="ope flex align-center padding" @click="doDrawer"><text class="icon cuIcon-filter"></text>筛选</view>
		</cu-custom>
		<!-- 选项卡 -->
		<com-scroll-tab :dataList="tabs" v-model="currentNav" activeColor="#0b8ffe"></com-scroll-tab>
		<!-- 内容区域 -->
		<view class="main-wrap">
			<!-- 待办业务列表 -->
			<nul-list ref="daibanref" v-show="currentNav==0" hideNav api="/api/daiban"></nul-list>
			<!-- 已办业务列表 -->
			<nul-list ref="yibanref" v-show="currentNav==1"  hideNav api="/api/yiban"></nul-list>
			<!-- 办结业务列表 -->
			<nul-list ref="banjieref" v-show="currentNav==2"  hideNav api="/api/banjie"></nul-list>
		</view>
	</view>
</template>

<script>
	import nulList from '@/pages/nullify/nulList'
	export default {
		components:{nulList},
		data() {
			return {
				currentNav:0,
				tabs:['待办业务','已办业务','办结业务']
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
