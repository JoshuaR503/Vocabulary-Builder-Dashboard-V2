import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import words from './modules/words';
import users from './modules/users';
import search from './modules/search';
import log from './modules/log';
import chart from './modules/chart';
import settings from './modules/settings';
import feedback from './modules/feedback';

// Load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        words,
        users,
        search,
        log,
        chart,
        settings,
        feedback
    }
});