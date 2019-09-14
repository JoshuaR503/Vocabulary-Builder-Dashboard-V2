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
    
    deleteUser: (state, id) => state.users.filter(user => {
        const index = state.users.findIndex(user => user._id === id);

        if (user._id === id) {
            state.usersCount--;
            state.users.splice(index, 1);
        }
    }),

    updateUser: (state, user) => {
        const index = state.users.findIndex(user => user._id === user._id);

        if (index !== -1) {
            state.users.splice(index, 1, user);
        }
    },
};

const actions = {
    // Load all the users.
    async fetchUsers({commit}) {
        // Start loading.
        commit('setLoading', true);

        await axios
        .get(`${URL_API}/v2/user`)
        .then(response => {
            // Set users.
            commit('setUsers', response.data.response.document);
            // Set user count
            commit('setUsersCount', response.data.response.count);
            // No longer loading.
            commit('setLoading', false);
        })
        .catch(error => {
            // No longer loading.
            commit('setLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

    // Create new user.
    async createUser({commit}, data) {
        // Start loading.
        commit('setLoading', true);

        await axios
        .post(`${URL_API}/v2/user`, data)
        .then(response => {
            // Add new user.
            commit('addUser', response.data.response.document);
            // No longer loading.
            commit('setLoading', false);
        })
        .catch(error => {
            // No longer loading.
            commit('setLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

    // Update single user.
    async updateUser({commit}, data) {
        // Start loading.
        commit('setLoading', true);

        await axios
        .put(`${URL_API}/v2/user/${data._id}`, data)
        .then(response => {
            // Update user.
            commit('updateUser', response.data.document);
            // No longer loading.
            commit('setLoading', false);
        })
        .catch(error => {
            // No longer loading.
            commit('setLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

    // Delete an user.
    async deleteUser({commit}, id) {
        // Start loading.
        commit('setLoading', true);

        await axios
        .delete(`${URL_API}/v2/user/${id}`)
        .then(() => {
            // No longer loading.
            commit('setLoading', false);
            // Delete user.
            commit('deleteUser', id);
        })
        .catch(error => {
            // No longer loading.
            commit('setLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });

    }
}

export default {
    state,
    getters,
    actions,
    mutations
};