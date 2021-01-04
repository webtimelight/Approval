import Vue from 'vue'
import App from './App'

//form校验
import Rules from '@/utils/rules'
Vue.prototype.$rules = Rules

// colorUi
import cuCustom from './common/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

// baseUrl,request
import api from '@/common/api.js'
Vue.prototype.$http = api.request
Vue.prototype.$baseUrl = api.baseUrl

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();