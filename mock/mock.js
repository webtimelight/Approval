/*
本地模拟接口请求, 仅demo演示用.
实际项目以服务器接口返回的数据为准,无需本地处理分页.
* */

// 预审列表
function apiPreList(pageNum, pageSize) {
	return new Promise((resolve, reject)=>{
		const XHR={
		statusCode:200,
		errMsg: "request:ok",
		data:{ 
		  "page":{"totalpage":2,"currentpage":1,"totalnum":10}, 
		  "results":[{
					name:'山东中鼎保险经纪有限责任公司',
					creat_date:'2020-10-23',
					code:913701007521810510,
					regnum:110104005802746,
					mem:'冯立国',
					type:0,
					status:0,
					worker:'王晓静',
				},{
					name:'山东汇通国际有限责任公司',
					creat_date:'2020-10-23',
					code:913701007521810510,
					regnum:110104005802746,
					mem:'冯立国',
					type:1,
					status:0
				},{
					name:'山东中鼎保险经纪有限责任公司',
					creat_date:'2020-10-23',
					code:913701007521810510,
					regnum:110104005802746,
					mem:'冯立国',
					type:2,
					status:0,
					worker:'李丽',
				},{
					name:'山东中鼎保险经纪有限责任公司',
					creat_date:'2020-10-23',
					code:913701007521810510,
					regnum:110104005802746,
					mem:'冯立国',
					type:0,
					status:0
				}]
			}		
		}
		//延时一秒,模拟联网
		setTimeout(function() {
			try {
				resolve(XHR);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
};

// 设立列表
function apiEstList(pageNum, pageSize) {
	return new Promise((resolve, reject)=>{
		const XHR={
		statusCode:200,
		errMsg: "request:ok",
		data:{ 
		  "page":{"totalpage":2,"currentpage":1,"totalnum":10}, 
		  "results":[{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司设立登记',
					expire_time:'2020-10-23',
					worker:'李萌'
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司设立登记',
					expire_time:'2020-10-23',
					worker:''
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:1,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司设立登记',
					expire_time:'2020-10-23',
					worker:'万晓利'
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司设立登记',
					expire_time:'2020-10-23',
					worker:'孙霞'
				}]
			}		
		}
		//延时一秒,模拟联网
		setTimeout(function() {
			try {
				resolve(XHR);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
};

// 变更列表
function apiModList(pageNum, pageSize) {
	return new Promise((resolve, reject)=>{
		const XHR={
		statusCode:200,
		errMsg: "request:ok",
		data:{ 
		  "page":{"totalpage":2,"currentpage":1,"totalnum":10}, 
		  "results":[{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司变更登记',
					expire_time:'2020-10-23',
					worker:'李萌'
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'私营集团变更登记',
					expire_time:'2020-10-23',
					worker:''
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:1,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司变更登记',
					expire_time:'2020-10-23',
					worker:'李萌'
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司变更登记',
					expire_time:'2020-10-23',
					worker:'李萌'
				}]
			}		
		}
		//延时一秒,模拟联网
		setTimeout(function() {
			try {
				resolve(XHR);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
};

// 注销列表
function apiNulList(pageNum, pageSize) {
	return new Promise((resolve, reject)=>{
		const XHR={
		statusCode:200,
		errMsg: "request:ok",
		data:{ 
		  "page":{"totalpage":2,"currentpage":1,"totalnum":10}, 
		  "results":[{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司注销登记',
					expire_time:'2020-10-23',
					worker:'李萌'
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'分公司注销登记',
					expire_time:'2020-10-23',
					worker:''
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:1,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司注销登记',
					expire_time:'2020-10-23',
					worker:'王晓丽'
				},{
					name:'山东中鼎保险经纪有限责任公司',
					process:0,
					reach_time:'2020-10-23',
					address:'山东省济南市历下区花园路205号',
					type:'公司注销登记',
					expire_time:'2020-10-23',
					worker:'李萌'
				}]
			}		
		}
		//延时一秒,模拟联网
		setTimeout(function() {
			try {
				resolve(XHR);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
};

// 意见列表
function apiSugList(pageNum, pageSize) {
	return new Promise((resolve, reject)=>{
		const XHR={
		statusCode:200,
		errMsg: "request:ok",
		data:{ 
		  "page":{"totalpage":2,"currentpage":1,"totalnum":10}, 
		  "results":[{
					step:'',
					code:'913720201029',
					result:0,
					sug_content:'材料上报准确，同意受理。',
					date:'2020-10-30',
					worker:'王晓静'
				},{
					step:'',
					code:'913720201029',
					result:1,
					sug_content:'内网检测到企业名称重复，请在外网企业登记平台重新进行企业核名。',
					date:'2020-10-20',
					worker:'李楠'
				},{
					step:'',
					code:'913720201029',
					result:0,
					sug_content:'材料上报准确，同意受理。',
					date:'2020-10-30',
					worker:'王晓静'
				},{
					step:'',
					code:'913720201029',
					result:1,
					sug_content:'内网检测到企业名称重复，请在外网企业登记平台重新进行企业核名。',
					date:'2020-10-20',
					worker:'李楠'
				}]
			}		
		}
		//延时一秒,模拟联网
		setTimeout(function() {
			try {
				resolve(XHR);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
};

export default{
	apiPreList,
	apiEstList,
	apiModList,
	apiNulList,
	apiSugList
}