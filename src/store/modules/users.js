import axios from 'axios';
import { URL_API } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

const state = {
    users: [],
    usersCount: 0,
    usersIsLoading: true,
    usersSkip: 0
};

const getters = {
    users: (state) => state.users,
    usersCount: (state) => state.usersCount,
    usersIsLoading: (state) => state.usersIsLoading,
    usersSkip: (state) => state.usersSkip,
    getUser:  state => id => state.users.find(user => user._id === id),
};

const mutations = {
    setUsers: (state, users) => state.users = users,
    setUsersCount: (state, count) => state.usersCount = count,
    setLoading: (state, usersIsLoading) => state.usersIsLoading = usersIsLoading,

    addUser: (state, user) => state.users.unshift(user),
    
    deleteUser: (state, id) => {
        const index = state.users.findIndex((user) => user._id === id);

        if (index !== -1) {
            state.usersCount--;
            state.users.splice(index, 1);    
        }
    },

    updateUser: (state, user) => {
        const index = state.users.findIndex((user) => user._id === user._id);

        if (index !== -1) {
            state.users.splice(index, 1, user);
        }
    },

    setUserSkip: (state, value) => {
        // Change state only if user is online.
        if (navigator.onLine) {
            state.usersSkip = state.usersSkip += value
        }
    }
};

const actions = {
    /**
     * Load all users
     * @param state
     * @param commit 
     */
    async fetchUsers({commit, state}) {
        // Fecth new users if there are none.
        await axios
        .get(`${URL_API}/v2/user`)
        .then((response) => {
            // Set users.
            commit('setUsers', response.data.response.document);
            // Set user count
            commit('setUsersCount', response.data.response.count);
            // No longer loading.
            commit('setLoading', false);
        })
        .catch((error) => {
            // No longer loading.
            commit('setLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

    /**
     * Search in the users collection.
     * @param commit 
     * @param dispatch
     * @param query
     */
    async searchUsers({commit, dispatch}, query) {
        // Making sure that there is content.
        if (!!query) {
            // Start loading.
            commit('setLoading', true);
            // axios http request.
            await axios
            .get(`${URL_API}/v2/search/users?search=${query}`)
            .then((response) => {
                // Set users.
                commit('setUsers', response.data.users);
                // No longer loading.
                commit('setLoading', false);
            })
            .catch((error) => {
                // No longer loading.
                commit('setLoading', false);
                // Report error to Sentry.
                reportExeption(error);
            });    
        } else {
            dispatch('fetchUsers');
        }
    },

    /**
     * Creates a new user.
     * @param commit 
     * @param data 
     */
    async createUser({commit}, data) {
        await axios
        .post(`${URL_API}/v2/user`, data)
        .then((response) => {
            // Add new user.
            commit('addUser', response.data.response.document);
            // No longer loading.
            commit('setLoading', false);
        })
        .catch((error) => {
            // No longer loading.
            commit('setLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

    // Load more words.
    async updateUsersSkip({commit}, value) {
        // Change more skip state.
        commit('setUserSkip', value);
    },

    /**
     * Updates a new user.
     * @param commit 
     * @param data 
     */
    async updateUser({commit}, data) {
        await axios
        .put(`${URL_API}/v2/user/${data._id}`, data)
        .then((response) => {
            // Update user.
            commit('updateUser', response.data.document);
            // No longer loading.
            commit('setLoading', false);
        })
        .catch((error) => {
            // No longer loading.
            commit('setLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

    /**
     * Deletes a new user.
     * @param commit 
     * @param data 
     */
    async deleteUser({commit}, id) {
        await axios
        .delete(`${URL_API}/v2/user/${id}`)
        .then(() => {
            // Delete user.
            commit('deleteUser', id);
            // No longer loading.
            commit('setLoading', false);
        })
        .catch((error) => {
            // No longer loading.
            commit('setLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};