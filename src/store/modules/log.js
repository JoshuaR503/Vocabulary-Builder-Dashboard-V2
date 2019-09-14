import axios from 'axios';
import { URL_API } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

const state = {
    logsServerLoading: null,
    logsAdminLoading: null,
    logsAdmin: null,
    logsServer: null,
}

const getters = {
    logsServerLoading: (state) => state.logsServerLoading,
    logAdminLoading: (state) => state.logAdminLoading,
    logsAdmin: (state) => state.logsAdmin,
    logsServer: (state) => state.logsServer
}

const mutations = {
    setLogsServerLoading: (state, data) => state.logsServerLoading = data,
    setLogsAdminLoading: (state, data) => state.logAdminLoading = data,
    setLogsAdmin: (state, data) => state.logsAdmin = data,
    setLogsServer: (state, data) => state.logsServer = data
}

const actions = {
    /**
     * Loads the logs from the server. 
     * @param commit
     */
    async loadLogsServer({commit}) {
        // Start loading
        commit('setLogsServerLoading', true);
        
        return await axios
        .get(`${URL_API}/v1/sentry/server`)
        .then((response) => {
            const data = response.data;
            
            commit('setLogsServer', data);
            commit('setLogsServerLoading', true);
        })
        .catch((error) => {
            // Set loading to false.
            commit('setLogsServerLoading', true);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

    /**
     * Loads the logs from the server. 
     * @param commit
     */
    async loadLogsAdmin({commit}) {
        // Start loading
        commit('setLogsAdminLoading', true);
        
        return await axios
        .get(`${URL_API}/v1/sentry/admin`)
        .then((response) => {
            const data = response.data;
            
            commit('setLogsAdmin', data);
            commit('setLogsAdminLoading', true);
        })
        .catch((error) => {
            // Set loading to false.
            commit('setLogsAdminLoading', true);
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
