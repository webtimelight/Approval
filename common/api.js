let baseUrl="http://rczgh.eap2.net/"  //http://localhost:8081
// #ifdef H5
baseUrl = "/api" //H5跨域处理，配合manifest的proxy
// #endif
const request=(options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+options.url,
			method:options.method||'GET',
			data:options.data||{},
			header:options.header||{
				'Content-Type':'application/x-www-form-urlencoded',
				// 'token':uni.getStorageSync("user_token")
			},
			timeout:10000,
			success: (res) => {
				if(res.statusCode!==200){
					if(res.statusCode == 401){
						uni.showModal({
							title: '提醒',
							content: `暂无权限访问，请重新登录`,
							confirmText: '去登录',
							success: (_res)=>{
								if (_res.confirm) {
									uni.reLaunch({
										url: '/pages/login/login'
									})
								} else if (_res.cancel) {
									// console.log('取消');
								}
							}
						})
					}else{
						uni.showToast({
							title:"获取内容失败，请检查网络",
							icon: 'none'
						});
						return
					}
				}
				resolve(res)
			},
			fail:(err)=>{
				uni.showToast({
					icon:'none',
					title:"请求失败"+err.errMsg
				})
				reject(err);
			}
		})
	})
};
export default{
	baseUrl,
	request
}