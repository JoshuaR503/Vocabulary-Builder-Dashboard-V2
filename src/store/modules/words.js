import axios from 'axios';
import { URL_API } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

const state = {
    words: [],
    wordCount: null,
    isLoading: true
};

const getters = {
    words: state => state.words,
    wordCount: state => state.wordCount,
    wordMode: state => state.wordMode,
    getWord:  state => id => state.words.find(word => word._id === id),
    isLoading: state => state.isLoading
};

const mutations = {
    setWords: (state, words) => state.words = words,
    setWordCount: (state, count) => state.wordCount = count,
    setLoading: (state, isLoading) => state.isLoading = isLoading,

    addWord: (state, word) => state.words.unshift(word),
    
    deleteWord: (state, id) => state.words.filter(word => {
        const index = state.words.findIndex(word => word._id === id);

        if (word._id === id) {
            state.wordCount--;
            state.words.splice(index, 1);
        }
    }),

    updateWord: (state, word) => {
        const index = state.words.findIndex(word => word._id === word._id);

        if (index !== -1) {
            state.words.splice(index, 1, word);
        }
    },
};

const actions = {
    // Load all the words.
    async fetchWords({commit}) {
        // Start loading.
        commit('setLoading', true);

        await axios
        .get(`${URL_API}/v2/word`)
        .then(response => {
            // Set words.
            commit('setWords', response.data.response.document);
            // Set word count
            commit('setWordCount', response.data.response.count);
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
    
    // Create new word.
    async createWord({commit}, data) {
        // Start loading.
        commit('setLoading', true);

        await axios
        .post(`${URL_API}/v2/word`, data)
        .then(response => {
            // Add new word.
            commit('addWord', response.data.response.document);
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

    // Update single word.
    async updateWord({commit}, data) {
        // Start loading.
        commit('setLoading', true);

        await axios
        .put(`${URL_API}/v2/word/${data._id}`, data)
        .then(response => {
            // Update word.
            commit('updateWord', response.data.document);
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

    // Delete a single word
    async deleteWord({commit}, id) {
        // Start loading.
        commit('setLoading', true);

        await axios
        .delete(`${URL_API}/v2/word/${id}`)
        .then(() => {
            // No longer loading.
            commit('setLoading', false);
            // Delete word from state.
            commit('deleteWord', id);
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