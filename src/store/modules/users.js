import axios from 'axios';
import {url} from '../../lib/config/config';

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
    setUsersCount: (state, count) => state.userCount = count,
    setLoading: (state, usersIsLoading) => state.usersIsLoading = usersIsLoading,

    addUser: (state, user) => state.users.unshift(user),
    
    deleteUser: (state, id) => state.users.filter(user => {
        const index = state.users.findIndex(user => user._id === id);

        if (user._id === id) {
            state.userCount--;
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

        try {
            await axios
            .get(`${url}/v2/user`)
            .then(response => {
                // Set users.
                commit('setUsers', response.data.response.document);
                // Set user count
                commit('setUsersCount', response.data.response.count);
                // No longer loading.
                commit('setLoading', false);
            });
        } catch (error) {
            throw error;
        }
    },

    // Create new user.
    async createUser({commit}, data) {
        // Start loading.
        commit('setLoading', true);

        try {
            await axios
            .post(`${url}/v2/user`, data)
            .then(response => {
                // Add new user.
                commit('addUser', response.data.response.document);
                // No longer loading.
                commit('setLoading', false);
            })
        } catch (error) {
            throw error;
        }
    },

    // Update single user.
    async updateUser({commit}, data) {
        // Start loading.
        commit('setLoading', true);

        try {
            await axios
            .put(`${url}/v2/user/${data._id}`, data)
            .then(response => {
                // Update user.
                commit('updateUser', response.data.document);
                // No longer loading.
                commit('setLoading', false);
            });
        } catch (error) {
            throw error;
        }
    },

    // Delete an user.
    async deleteUser({commit}, id) {
        try {
            await axios
            .delete(`${url}/v2/user/${id}`)
            .then(() => commit('deleteUser', id));
        } catch (error) {
            throw error;
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};