import axios from 'axios';
import {url} from '../../lib/config/config';

const state = {
    words: [],
    wordCount: null,
    wordMode: {
        mode: null,
        id: null
    }
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
    setWordMode: (state, wordMode) => state.wordMode = wordMode,
    updateWord: (state, word) => {
        const index = state.words.findIndex(word => word._id === word._id);

        if (index !== -1) {
            state.words.splice(index, 1, word);
        }
    }
};

const actions = {

    // Set setWordMode
    setWordMode({commit}, data) {
        commit('setWordMode', data);
    },

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
                
                // Set new word.
                commit('addWord', response.data);

                // Return data.
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

                console.log(response);

                // Update new word.
                // commit('updateWord', response.data);

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