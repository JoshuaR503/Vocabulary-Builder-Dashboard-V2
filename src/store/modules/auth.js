import axios from 'axios';
import {url} from '../../lib/config/config';

const state = {
    authToken: localStorage.getItem('auth_token') || null,
    authPermission: localStorage.getItem('auth_permission') || null,
    authUser: localStorage.getItem('auth_user') || null
};

const getters = {
    authPermission: state => state.authPermission,
    authToken: state => state.authToken,
    authUser: state => state.authUser,
    isAuth: state => !!state.authToken
};

const mutations = {
    // Mutate the data values.
    setAuthData(state, token, authPermission, authUser) {
        state.authToken = token;
        state.authPermission = authPermission;
        state.authUser = authUser;
    },
};

const actions = {
    // Login the user.
    async loginAction({commit}, user) {

        await axios
        .post(`${url}/v2/auth`, user)
        .then(response => {
            // Get data from response.
            const authToken = response.data.token;
            const authPermission = response.data.document.role;
            const authUser = response.data.document;

            // Save data in LocalStorage.
            localStorage.setItem('auth_token', authToken);
            localStorage.setItem('auth_permission', authPermission);
            localStorage.setItem('auth_user', authUser.name);

            // Set state.
            commit('setAuthData',
                authToken,
                authPermission,
                authUser
            );
        });
        // No need to handle error. Or is it?.
        // .catch()
    },

    // Logout the user.
    logoutAction({commit}) {

        // Remove data from LocalStorage.
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_permission');
        localStorage.removeItem('auth_users');

        // Redirect user to login.        
        // Set state.
        commit('setAuthData', null, null, null);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};