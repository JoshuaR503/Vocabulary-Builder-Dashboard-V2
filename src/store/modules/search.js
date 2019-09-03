import axios from 'axios';
import {url} from '../../lib/config/config';

const state = {
    query: null,
    globalSearchResults: null
}

const getters = {
    query: state => state.query,
    globalSearchResults: state => state.globalSearchResults,
    
}

const mutations = {
    setQuery: (state, query) => state.query = query,
    setGlobalSearchResults: (state, globalSearchResults) => state.globalSearchResults = globalSearchResults,
}

const actions = {
    /**
     * Fetch search results.
     * @param commit
     * @param query 
     */
    async search({commit}, query) {
        try {
            return await axios
            .get(`${url}/v2/search?query=${query}`)
            .then(response => {
                const data = response.data;

                commit('setQuery', query);
                commit('setGlobalSearchResults', data);

                return {
                    data,
                    query
                }
            });
        } catch (error) {
            //TODO: Report error.
            console.log(error);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};