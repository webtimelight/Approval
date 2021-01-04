<script>
import Vue from 'vue'
export default {
	onLaunch: function() {
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				};
				// #endif
		
				// #ifdef MP-WEIXIN || MP-QQ
				Vue.prototype.StatusBar = e.statusBarHeight;
				let capsule = wx.getMenuButtonBoundingClientRect();
				if (capsule) {
					Vue.prototype.Custom = capsule;
					// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
					Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				}
				// #endif		
		
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* 全局引入fontawesome.css unicss*/
/* uni */
@import url('@/common/css/uni.css');
/* colorui */
@import url('@/common/colorui/main.css');
@import url('@/common/colorui/icon.css');
@import url('@/common/colorui/animation.css');
/* ext */
@import url('@/common/css/animate.min.css');
@import url('@/common/css/fontAwesome.css');
@import url('@/common/css/iconfont.css');
@import url('@/common/css/iconfont-color.css');
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {font-family: uniicons;src: url('~@/static/font/uni.ttf')}
/* #endif */

/* 全局设置字体 */
page{background: #f6f6f6;font-family: geometr,uniicons}
.status_bar {height: var(--status-bar-height);width: 100%;}
/* 动画 */
@keyframes show {
	0% {
		transform: translateY(-50px) scale(0.5);
		opacity:0;
	}

	60% {
		transform: translateY(40rpx)  scale(0.8);
		opacity:1
	}

	100% {
		transform: translateY(0px)  scale(1);
		opacity:1
	}
}
</style>
