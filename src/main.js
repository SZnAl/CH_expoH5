import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

import './assets/icon/iconfont.css';

Vue.config.productionTip = false;

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
