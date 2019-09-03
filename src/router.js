import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

import { 
  Login,
  Dashboard,
  Word,
  User,
  SearchResults
} from './components/index';

Vue.use(Router);

// Routes
const router = new Router({
  mode: 'history',
  hash: false,
  routes: [
    { path: '/login',  name: 'login', component: Login},
    { path: '/', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true }},
    { path: '/word/:id', name: 'word', component: Word, meta: { requiresAuth: true }},
    { path: '/user/:id', name: 'user', component: User, meta: { requiresAuth: true }},
    { path: '/search/:query', name: 'search', component: SearchResults, 
      meta: { 
        requiresAuth: true 
      }
    },

  ]
});

// Check if we need to authenticate
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuth = store.getters['isAuth'];

  if (requiresAuth && !isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;