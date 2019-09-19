import axios from 'axios';
import { URL_API } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

const state = {
    users: [],
    usersCount: null,
    usersIsLoading: true
};

const getters = {
    users: state => state.users,
    usersCount: state => state.usersCount,
    getUser:  state => id => state.users.find(user => user._id === id),
    usersIsLoading: state => state.usersIsLoading
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
};

const actions = {
    /**
     * Load all users
     * @param state
     * @param commit 
     */
    async fetchUsers({commit, state}) {
        // Amount of users.
        const users = state.users.length > 0;

        // Fecth new users if there are none.
        if (!users) {
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