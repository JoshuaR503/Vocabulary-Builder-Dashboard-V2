import axios from 'axios';
import {url} from '../../config/config';

const state = {
    words: []
};

const getters = {
    words: state => state.words,
};

const mutations = {
    setWords: (state, words) => state.words = words,
};

const actions = {
    // Delete a word.
    deleteWord(state, id) {
        // TODO: make http call to delete word.
    },

    // Load all the words.
    fetchWords({commit}) {
        return new Promise((resolve, reject) => {
            axios
            .get(`${url}/v2/word`)
            .then(response => {

                console.log(response);

                // // Set state.
                // commit('setAuthData',
                //     authToken,
                //     authPermission,
                //     authUser
                // );

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