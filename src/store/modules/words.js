import axios from 'axios';
import { URL_API, LIMIT, NEXT } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

const state = {
    words: [],
    wordCount: 0,

    isLoading: true,
    skip: 0
};

const getters = {
    skip: state => state.skip,
    words: state => state.words,
    wordCount: state => state.wordCount,
    wordMode: state => state.wordMode,
    isLoading: state => state.isLoading,
};

const mutations = {
    setWords: (state, words) => state.words = words,
    setWordCount: (state, count) => state.wordCount = count,
    setLoading: (state, isLoading) => state.isLoading = isLoading,
    
    addWord: (state, word) => state.words.unshift(word),
    
    deleteWord:  (state, id) => {
        const index = state.words.findIndex((words) => words._id === id);

        if (index !== -1) {
            state.wordCount--;
            state.words.splice(index, 1);    
        }
    },

    updateWord: (state, word) => {
        const index = state.words.findIndex(word => word._id === word._id);

        if (index !== -1) {
            state.words.splice(index, 1, word);
        }
    },

    setSkip: (state, value) => {

        if (state.wordCount < state.skip + value) {
            return;
        }

        // Change state only if user is online.
        if (navigator.onLine) {
            state.skip = state.skip += value
        }
    }
};

const actions = {
    // Load all the words.
    async fetchWords({commit, state}) {
        // Start loading.
        commit('setLoading', true);
        // axios http request.
        await axios
        .get(`${URL_API}/v2/word?limit=${LIMIT}&skip=${state.skip}`)
        .then((response) => {
            // Set words.
            commit('setWords', response.data.response.document);
            // Set word count
            commit('setWordCount', response.data.response.count);
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

    // Search in all the words.
    async searchWords({commit, dispatch}, query) {

        const search = !!query; 

        // Making sure that there is content.
        if (search) {
            // Start loading.
            commit('setLoading', true);
            // axios http request.
            await axios
            .get(`${URL_API}/v2/search/words?search=${query}`)
            .then((response) => {
                // Set words.
                commit('setWords', response.data.words);
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
            dispatch('fetchWords');
        }
    },

    // Load more words.
    async updateSkip({commit}, value) {
        // Change more skip state.
        commit('setSkip', value);
    },
    
    // Create new word.
    async createWord({commit}, data) {
        // Start loading.
        commit('setLoading', true);
        // Axios http request.
        await axios
        .post(`${URL_API}/v2/word`, data)
        .then((response) => {
            // Add new word.
            commit('addWord', response.data.response.document);
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

    // Update single word.
    async updateWord({commit}, data) {
        // Start loading.
        commit('setLoading', true);
        // Axios http request.
        await axios
        .put(`${URL_API}/v2/word/${data._id}`, data)
        .then((response) => {
            // Update word.
            commit('updateWord', response.data.document);
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

    // Update single word.
    async updateAudioWord({commit}, data) {
        // Start loading.
        commit('setLoading', true);
        // Axios http request.
        await axios
        .put(`${URL_API}/v2/word/${data._id}/audio`, data)
        .then((response) => {
            // Update word.
            commit('updateWord', response.data.document);
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

    // Delete a single word
    async deleteWord({commit}, id) {
        // Warn user before deleting.
        // eslint-disable-next-line
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this word",
            icon: "warning",
            buttons: true,
            dangerMode: true,    
        })
        .then((d) => {
            if (d) {
                // Start loading.
                commit('setLoading', true);
                // Axios http request.
                axios
                .delete(`${URL_API}/v2/word/${id}`)
                .then(() => {
                    // Delete word from state.
                    commit('deleteWord', id);
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
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
