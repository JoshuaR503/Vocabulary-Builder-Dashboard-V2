import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import words from './modules/words';

// Load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        words
    }
});