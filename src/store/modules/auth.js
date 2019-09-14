import axios from 'axios';
import router from '../../router';
import { URL_API } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

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
    // Set user name.
    setAuthUser: (state, authUser) => state.authUser = authUser,

    // Set user name.
    setAuthToken: (state, authToken) => state.authToken = authToken,

    // Set user permission.
    setAuthPermission: (state, authPermission) => state.authPermission = authPermission,

    // Set data null. 
    setDataNull: (state, data) => {
        state.authUser = data;
        state.authToken = data;
        state.authPermission = data;
    }
};

const actions = {
    // Login the user.
    async loginAction({commit}, user) {
        await axios
        .post(`${URL_API}/v2/auth`, user)
        .then(response => {
            
            // Get data from response.
            const authUser = response.data.document.name;
            const authToken = response.data.token;
            const authPermission = response.data.document.role;

            // Set user name.
            commit('setAuthUser', authUser);

            // Set token.
            commit('setAuthToken', authToken);

            // Set state.
            commit('setAuthPermission', authPermission);

            // Save data in LocalStorage.
            localStorage.setItem('auth_user', authUser);
            localStorage.setItem('auth_token', authToken);
            localStorage.setItem('auth_permission', authPermission);
        })
        .catch(error => reportExeption(error));
    },

    // Logout the user.
    logoutAction({commit}) {
        // Remove data from LocalStorage.
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_permission');
        localStorage.removeItem('auth_users');

        // Redirect user to login.
        router.push('/login');
        
        // Set state.
        commit('setDataNull', null);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};