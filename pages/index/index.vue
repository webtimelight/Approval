<template>
	<view>
		<!-- banenr -->
		<view class="banner bg-gradual-blue">
			<view class="state">
				<text>在线人数：461人</text>
				<view class="iconfont icon-setting" @click="showDrawer"></view>
			</view>
			<image class="animation-fade logo-img" src="/static/image/index_banner.png" mode="widthFix"></image>
			<view class="welcome">
				<text>您好，管理员</text>
				<view><text class="iconfont icon-time"></text>{{date}}</view>	
			</view>
		</view>
		<!-- 图标 -->
		<view class="nav-list">
			<navigator hover-class="none" :url="item.url" class="nav-li shadow-blur radius animation-scale-up" navigateTo :class="'bg-'+item.color"
			:style="{animationDelay: (index + 1)*0.1 + 's'}"
			  v-for="(item,index) in elements" :key="index">
				<view class="nav-title">{{item.title}}</view>
				<text :class="['iconfont','icon-' + item.cuIcon]"></text>
			</navigator>
		</view>
		<!-- 设置 -->
		<view class="cu-modal drawer-modal justify-end" :class="drawerShow?'show':''" @click="hideDrawer">
			<view class="cu-dialog basis-lg" @tap.stop="">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow">
						<view class="content">
							<view>指纹登录</view>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<view>手势登录</view>
						</view>
					</view>
					<view class="exit padding radius bg-gradual-orange" @click="exit">
						<view class="text-center">退出登录</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				date:'',
				timer:null,
				drawerShow: false,
				elements: [{
						title: '登记预审',
						color: 'gradual-blue',
						cuIcon: 'yushen2',
						url:'/pages/preApproval/preIndex'
					},
					{
						title: '设立登记',
						color: 'gradual-green',
						cuIcon: 'sheli2',
						url:'/pages/establish/estIndex'
					},
					{
						title: '变更登记',
						color: 'gradual-orange',
						cuIcon: 'biangeng2',
						url:'/pages/modify/modIndex'
					},
					{
						title: '注销登记 ',
						color: 'gradual-purple',
						cuIcon: 'zhuxiao3',
						url:'/pages/nullify/nulIndex'
					}
				],
			};
		},
		mounted() {
			this.getTime()
			this.currentDate()
		},
		methods:{
			getTime(){
				let now = new Date();
				let year = now.getFullYear(); 
				let month = ('0'+(now.getMonth()+1)).slice(-2);
				let date = ('0'+now.getDate()).slice(-2);
				let hour = ('0'+now.getHours()).slice(-2);
				let minu = ('0'+now.getMinutes()).slice(-2);
				let sec = ('0'+now.getSeconds()).slice(-2);
				this.date=`${year}年${month}月${date}日 ${hour}:${minu}:${sec}`
			},
			currentDate(){
				this.timer = setInterval(()=>{
					this.getTime()
				},1000);
				this.$once('hook:beforeDestroy',()=>{
					clearInterval(this.timer);
					this.timer = null;
				})
			},
			showDrawer() {
				this.drawerShow = true
			},
			hideDrawer() {
				this.drawerShow = false
			},
			exit(){
				uni.showModal({
					title:'确定要退出登录吗'
				})
			}
		}
	}
</script>

<style lang="scss">
page{background:#ffffff}
.banner{
	height: 600rpx;position: relative;
	margin-bottom: 80rpx;
	text-align: center;padding-top: 140rpx;
	.state{
		position: absolute;top:var(--status-bar-height);left:0;right:0;line-height: 100rpx;
		display: flex;align-items: center;justify-content: space-between;padding: 0 10rpx 0 40rpx;
		.iconfont{
			font-size: 40rpx;text-shadow: 0 0 16rpx rgba(0,0,0,0.03);
			padding:20rpx 30rpx;
		}
	}
	.logo-img{
		width: 80%;
	}
	.welcome{
		position: absolute;bottom:0;left:0;right:0;line-height: 80rpx;padding: 0 40rpx;color:rgba(255,255,255,0.9);
		background:rgba(255,255,255,0.2);text-align: left;display: flex;align-items: center;justify-content: space-between;
		.iconfont{
			padding-right: 10rpx;font-size: 28rpx;
		}
	}
}
.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0px 20rpx 0px;
	justify-content: space-between;
	.nav-li {
		padding:60rpx 30rpx;
		flex:0 0 42%;
		margin: 0 4% 60rpx;
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nav-title {
			font-size: 32rpx;
			font-weight: 300;
			&::first-letter {
				font-size: 40rpx;
				margin-right: 4rpx;
			}
		}
		.iconfont {
			font-size: 60rpx;
			text-align: center;
			line-height: 60rpx;
		}
	}
}
.cu-dialog{
	padding-top: var(--status-bar-height);
	.cu-list{
		.exit{
			margin:60rpx 30rpx;padding: 20rpx;
		}
	}
}
</style>
