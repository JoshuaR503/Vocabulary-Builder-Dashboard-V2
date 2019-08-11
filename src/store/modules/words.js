import axios from 'axios';
import {url} from '../../config/config';

const state = {
    words: [],
    wordCount: null
};

const getters = {
    words: state => state.words,
    wordCount: state => state.wordCount
};

const mutations = {
    setWords: (state, words) => state.words = words,
    setWordCount: (state, count) => state.wordCount = count,
};

const actions = {
    // Load all the words.
    fetchWords({commit}) {
        return new Promise((resolve, reject) => {
            axios
            .get(`${url}/v2/word`)
            .then(response => {

                // Set words.
                commit('setWords', response.data.response.document);

                // Set word count
                commit('setWordCount', response.data.response.count);

                // Resolve Promise.
                resolve(response);
            })
            .catch(error => reject(error));
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};