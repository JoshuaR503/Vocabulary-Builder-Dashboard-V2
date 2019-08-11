import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

import { 
  Login,
  Dashboard
} from './components/index';

Vue.use(Router);

// Routes
const router = new Router({
  mode: 'history',
  hash: false,
  routes: [
    { path: '/login',  name: 'login', component: Login},
    { path: '/', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true }},
  ]
});

// Check if we need to authenticate
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters['isAuth']) {
    next('/login');
  } else {
    next();
  }
});

export default router;