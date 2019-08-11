import axios from 'axios';

const state = {
    authPermission: null,
    authToken: null,
    authUser: null
};

const getters = {
    authStatus: state => state.authStatus,
    authPermission: state => state.authPermission,
    authToken: state => state.authToken,
    authUser: state => state.authUser,
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
        return new Promise((resolve, reject) => {
            axios
            .post('http://localhost:5000/v2/au', user)
            .then(response => {

                // Get data from response.
                const authToken = response.data.token;
                const authPermission = response.data.document.role;
                const authUser = response.data.document;

                // Set Auth Token to all http requests.
                axios.defaults.headers.common['x-authorization-token'] = authToken;

                // Set state.
                commit('setAuthData', 
                    authToken, 
                    authPermission,
                    authUser
                );

                // Resolve Promise.
                resolve(response);
            })
            .catch(error => reject(error));
        });
    },

    // Logout the user.
    async logoutAction({commit}) {
        // Set state
        return commit('setAuthData', null, null, null);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};