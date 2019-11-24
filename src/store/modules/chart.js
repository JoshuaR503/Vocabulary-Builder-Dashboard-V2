import axios from 'axios';
import { URL_API } from '../../lib/config/config';

const state = {
    isLoading: false,


    nounsCount: 0,
    verbsCount: 0,
    idiomsCount: 0,
    adverbsCount: 0,
    adjectivesCount: 0,
    phrasalverbsCount: 0,

    easyCount: 0,
    mediumCount: 0,
    hardCount: 0,
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
    ],

    chartLevelData: (state) => [
        state.hardCount,
        state.easyCount,
        state.mediumCount, 
    ]
};

const mutations = {
    setChartsIsLoading: (state, data) => state.isLoading = data,

    setChartData: (state, data) => {
        state.nounsCount = data.nounsCount;
        state.verbsCount = data.verbsCount;
        state.idiomsCount = data.idiomsCount;

        state.adverbsCount = data.adverbsCount;
        state.adjectivesCount = data.adjectivesCount;
        state.phrasalverbsCount = data.phrasalverbsCount;
    },

    setChartLevelData: (state, data) => {
        state.easyCount = data.easyCount;
        state.mediumCount = data.mediumCount;
        state.hardCount = data.hardCount;
    },

};

const actions = {
    // Request count from every categorgy.
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
        .then(axios.spread(( nouns, verbs, idioms, adverbs, adjectives, phrasalverbs ) => {

            const data = {
                nounsCount: nouns.data.response,
                verbsCount: verbs.data.response,
                idiomsCount: idioms.data.response,
                adverbsCount: adverbs.data.response,
                adjectivesCount: adjectives.data.response,
                phrasalverbsCount: phrasalverbs.data.response,
            }

            commit('setChartData', data);
            commit('setChartsIsLoading', false);
        }))

        .catch(() => commit('setChartsIsLoading', false));
    },

    // Request count from every difficulty level.
    async fetchChartLevelData({commit}) {

        commit('setChartsIsLoading', true);

        await axios.all([
            axios.get(`${URL_API}/v2/word/count/level/?level=easy`),
            axios.get(`${URL_API}/v2/word/count/level/?level=medium`),
            axios.get(`${URL_API}/v2/word/count/level/?level=hard`),
        ])
        .then(axios.spread(( easy, medium, hard) => {

            const data = {
                easyCount: easy.data.response,
                mediumCount: medium.data.response,
                hardCount: hard.data.response,
            }

            commit('setChartLevelData', data);
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
