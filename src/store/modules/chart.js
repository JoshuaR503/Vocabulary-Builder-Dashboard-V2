import axios from 'axios';
import { URL_API } from '../../lib/config/config';

const state = {
    isLoading: false,
    nounsCount: 0,
    verbsCount: 0,
    idiomsCount: 0,
    adverbsCount: 0,
    adjectivesCount: 0,
    phrasalverbsCount: 0
};

const getters = {
    chartsIsLoading: (state) => state.isLoading,

    chartData: (state) => [
        state.nounsCount,
        state.verbsCount,
        state.idiomsCount,
        state.adverbsCount,
        state.adjectivesCount,
        state.phrasalverbsCount
    ]
};

const mutations = {
    setChartsIsLoading: (state, data) => state.isLoading = data,

    setNounsCount: (state, data) => state.nounsCount = data,
    setVerbsCount: (state, data) => state.verbsCount = data,
    setIdiomsCount: (state, data) => state.idiomsCount = data,

    setAdverbsCount: (state, data) => state.adverbsCount = data,
    setAdjectivesCount: (state, data) => state.adjectivesCount = data,
    setPhrasalverbsCount: (state, data) => state.phrasalverbsCount = data,
};

const actions = {
    // Load all the words.
    async fetchChartData({commit}) {

        commit('setChartsIsLoading', true);

        await axios.all([
            axios.get(`${URL_API}/v2/word/count/category/?category=noun`),
            axios.get(`${URL_API}/v2/word/count/category/?category=verb`),
            axios.get(`${URL_API}/v2/word/count/category/?category=idiom`),
            axios.get(`${URL_API}/v2/word/count/category/?category=adverb`),
            axios.get(`${URL_API}/v2/word/count/category/?category=adjective`),
            axios.get(`${URL_API}/v2/word/count/category/?category=phrasal verb`)
        ])
        .then(axios.spread((
            nouns, verbs, idioms, 
            adverbs, adjectives, phrasalverbs
        ) => {

            commit('setNounsCount', nouns.data.response);
            commit('setVerbsCount', verbs.data.response);
            commit('setIdiomsCount', idioms.data.response);

            commit('setAdverbsCount', adverbs.data.response);
            commit('setAdjectivesCount', adjectives.data.response);
            commit('setPhrasalverbsCount', phrasalverbs.data.response);
            
            commit('setChartsIsLoading', false);
        }))

        .catch(() => commit('setChartsIsLoading', false));
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
