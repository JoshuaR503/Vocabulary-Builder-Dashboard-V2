import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import VueApexCharts from 'vue-apexcharts';

// http helper.
import { setup } from './lib/helpers';

// Sentry
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

// init helper.
setup();

// Sentry Init
Sentry.init({
  dsn: 'https://ebd10d57317149b3a79a596021840683@sentry.io/1550804',
  integrations: [new Integrations.Vue({
    Vue, 
    attachProps: true}
  )],
});

Vue.config.productionTip = false;
Vue.use(VueApexCharts)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
