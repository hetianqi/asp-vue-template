'use strict';

import Vue from 'vue';
import MpVueTools from 'mp-vue-tools';
import App from './App';
import router from './router';

import 'mp-vue-tools/dist/index.css';
Vue.use(MpVueTools);

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});