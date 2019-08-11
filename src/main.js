import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store/index';

// http helper.
import setup from './helpers/httpInterceptor';

// init helper.
setup();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
