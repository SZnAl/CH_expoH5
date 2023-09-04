import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/logIn.vue';
import Reg from '../views/regIndex.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'logIn',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: Login,
		meta: { isAuth: true },
		beforeEnter: (to, from, next) => {
			if (to.meta.isAuth) {
				if (sessionStorage.getItem('superhiiCache') === 'pass') {
					router.replace('/home');
					next();
				} else {
					next(); //无已登录标识进入登录页
				}
			}
		},
	},
	{
		path: '/reg',
		name: 'Reg',
		component: Reg,
	},
	{
		path: '/home',
		name: 'home',
		component: HomeView,
		// meta: {
		// 	title: '首页',
		// },
	},
];

const router = new VueRouter({
	routes,
});

router.beforeEach((to, from, next) => {
	// if (to.meta.title) {
	// 	document.title = to.meta.title;
	// }

	document.title = 'Hi Cart';

	next();
});

export default router;
