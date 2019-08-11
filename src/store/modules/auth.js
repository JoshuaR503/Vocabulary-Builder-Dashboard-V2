import axios from 'axios';

const state = {
    authPermission: null,
    authToken: null,
    user: null
};

const getters = {
    authStatus: state => state.authStatus,
    authPermission: state => state.authPermission,
    authToken: state => state.authToken,
    user: state => state.user,
};

const mutations = {
    // Mutate the data values.
    setAuthData(state, token, authPermission, user) {
        state.authToken = token;
        state.authPermission = authPermission;
        state.user = user;

        console.log('Data stored', state);
    },
};

const actions = {
    // Login the user.
    async loginAction({commit}, user) {
        return new Promise((resolve, reject) => {
            axios
            .post('http://localhost:5000/v2/auth', user)
            .then(response => {
                // Get data from response.
                const authToken = response.data.token;
                const authPermission = response.data.document.role;
                const user = response.document;

                // Set Auth Token to all http requests.
                axios.defaults.headers.common['x-authorization-token'] = authToken;

                // Set state.
                commit('setAuthData', 
                    authToken, 
                    authPermission,
                    user
                );

                // Resolve Promise
                resolve(response);
            })
            .catch(error => reject(error));
        });
    },

    // Logout the user.
    async logoutAction({commit}) {
        // Set state
        return commit('setAuthData', null, null, null, 'expired');
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};