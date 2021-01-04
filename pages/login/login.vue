<template>
	<view class="page-login">
		<!-- 登录 -->
		<view class="login">
			<view class="logo">
				<image class="photo" src="@/static/image/logo-photo.png" mode=""></image>
			</view>
			<view class="form">
				<view class="input-ctrol user uni-flex">
					<view class="iconfont icon-user text-orange"></view>
					<input class="input" placeholder="请输入账号" placeholder-class="placeholderColor" autocomplete="off"/>
				</view>
				<view class="input-ctrol psw uni-flex">
					<view class="iconfont icon-lock text-orange"></view>
					<input class="input"  placeholder="请输入密码" placeholder-class="placeholderColor" />
				</view>
				<button class="button cu-btn round bg-gradual-blue lg shadow-blur" @click="navTo('/pages/index/index')">登 录</button>
			</view>
		</view>
		<!-- 动画 -->
		<view class="waves-wrap">
			<view class="waves">
			   <view class="wave-item" ></view>
			   <view class="wave-item" ></view>
			   <view class="wave-item" ></view> 
			   <view class="wave-item" ></view>
			   <view class="wave-item" ></view>
			   <view class="wave-item" ></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		onLoad(options) {
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
page{height: 100%;}
.page-login{
	display: flex;
	height: 100%;overflow: hidden;
	flex-direction: column;
	background-color:  #ffffff;
}
.login{
	height: 100%;
	.logo{
		height:420rpx;position: relative;
		background:url(@/static/image/logo-bg.png) no-repeat center bottom;
		background-size: 100% auto;
		margin-bottom: 120rpx;
		.photo{
			display: block;
			    width:200rpx;
			    height:200rpx;
			    border-radius: 50%;
			    border: 14rpx solid #fff;
			    box-shadow: 3rpx 0 40rpx rgba(0,0,0,0.2);
			    position: absolute;
			    bottom: -100rpx;
			    left: 50%;
			    transform: translateX(-50%);
			    background: #ffffff;
		}
	}
	.form{
		padding: 80rpx;
		.input-ctrol{
			align-items: center;height:100rpx;line-height: 100rpx;margin-bottom: 50rpx;
			position: relative;line-height: normal;background: rgba(0,0,0,0.03);border-radius: 100rpx;
			background-color: #f5f5f5;
			.placeholderColor{color:rgba(0,0,0,0.3)}
			&::after{
				content:'';
				position:absolute;
				z-index: 0;
				left:0;top:0;
				height: 200%;
				width: 200%;
				border:0px solid #ddd;
				transform: scale(0.5);
				transform-origin: 0 0;
				border-radius: 200rpx;
			}
			.iconfont{
				padding-left: 36rpx;font-size: 40rpx;
			}
			.input{
				padding: 0 30rpx;
				flex:1;position: relative;z-index: 1;font-size: 15px;
			}
		}
		.button{width: 100%;height: 110rpx;margin-top: 40rpx;color:#ffffff;font-size: 36rpx;}
	}
}	
/* 动画 */	
.waves-wrap{
	 display: block; width: 100%;height: 120rpx;position: absolute;bottom:0;overflow: hidden;
	.waves{
		height: 100%;
		.wave-item{
			height: 100%;
			width: 200%;
			background-repeat:no-repeat;
			background-size: 100% 100%;
			background-position: center bottom;
			animation: move-wave 8s linear infinite;
			position: absolute;
			&:nth-child(1){animation-delay: 0s; animation-duration: 7s;background-image:  url(../../static/image/wave_01.png)}
			&:nth-child(2){animation-delay: 0s; animation-duration: 7s;background-image:  url(../../static/image/wave_01.png);left:-200%;}
			&:nth-child(3){animation-delay: -2s; animation-duration: 12s;background-image: url(../../static/image/wave_02.png);}
			&:nth-child(4){animation-delay: -2s; animation-duration: 12s;background-image: url(../../static/image/wave_02.png);left:-200%;}
			&:nth-child(5){animation-delay: -6s; animation-duration: 9s;background-image: url(../../static/image/wave_03.png);}
			&:nth-child(6){animation-delay: -6s; animation-duration: 9s;background-image: url(../../static/image/wave_03.png);left:-200%;}
		}
	} 
}@keyframes move-wave{0%{transform: translate(0, 0%);} 100%{transform: translate(100%, 0%)}}

</style>
