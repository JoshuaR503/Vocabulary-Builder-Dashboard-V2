import axios from 'axios';
import {url} from '../../lib/config/config';

const state = {
    query: null,
    isSearchLoading: false,
    globalSearchResults: null
}

const getters = {
    query: state => state.query,
    isSearchLoading: state => state.isSearchLoading,
    globalSearchResults: state => state.globalSearchResults,
    
}

const mutations = {
    setQuery: (state, query) => state.query = query,
    setIsSearchLoading: (state, isSearchLoading) => state.isSearchLoading = isSearchLoading,
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
            commit('setIsSearchLoading', true);

            return await axios
            .get(`${url}/v2/search?query=${query}`)
            .then(response => {
                const data = response.data;

                commit('setQuery', query);
                commit('setGlobalSearchResults', data);
                commit('setIsSearchLoading', false);

                return {
                    data,
                    query
                }
            });
        } catch (error) {
            //TODO: Report error.
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};