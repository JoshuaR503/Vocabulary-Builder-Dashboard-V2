import axios from 'axios';
import {url} from '../../lib/config/config';

const state = {
    words: [],
    wordCount: null,
};

const getters = {
    words: state => state.words,
    wordCount: state => state.wordCount,
    wordMode: state => state.wordMode,
    getWord:  state => (id) => state.words.find(word => word._id === id)
};

const mutations = {
    setWords: (state, words) => state.words = words,
    setWordCount: (state, count) => state.wordCount = count,

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
        try {
            await axios
            .get(`${url}/v2/word`)
            .then(response => {
                // Set words.
                commit('setWords', response.data.response.document);
                // Set word count
                commit('setWordCount', response.data.response.count);
            });
        } catch (error) {
            throw error;
        }
    },

    // Load a single word.
    async fetchSingleWord({commit}, id) {
        try {
            return commit('setWords', id);
        } catch (error) {
            throw error;
        }
    },
    
    // Create new word.
    async createWord({commit}, data) {
        try {
            return await axios
            .post(`${url}/v2/word`, data)
            .then(response => {
                
                // Add new word.
                commit('addWord', response.data);

                // // Return data.
                return response;
            })
        } catch (error) {
            throw error;
        }
    },

    // Update single word.
    async updateWord({commit}, data) {
        try {
            return await axios
            .put(`${url}/v2/word/${data._id}`)
            .then(response => {

                // Update word.
                commit('updateWord', response.data.document);

                return response;
            });
        } catch (error) {
            throw error;
        }
    },

    // Delete a single word
    async deleteWord({commit}, id) {
        try {
            return await axios
            .delete(`${url}/v2/word/${id}`)
            .then(response => {

                // Update word.
                commit('deleteWord', id)

                return response;
            });
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