import axios from 'axios';
import { URL_API } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

const state = {
    logsAdmin: [],
    logsServer: [],
    logsLoading: true,
}

const getters = {
    logsAdmin: (state) => state.logsAdmin,
    logsServer: (state) => state.logsServer,
    logsLoading: (state) => state.logsLoading,
}

const mutations = {
    setLogsAdmin: (state, data) => state.logsAdmin = data,
    setLogsServer: (state, data) => state.logsServer = data,
    setLogsLoading: (state, data) => state.logsLoading = data,
}

const actions = {

    /**
     * Loads the logs from Sentry.
     * @param state
     * @param commit
     */
    async loadLogs({commit, state}) {

        const admin = state.logsAdmin.length > 0;
        const server = state.logsServer.length > 0;

        // Load only if state hasn't loaded.
        if (!admin && !server) {
            await axios
            .get(`${URL_API}/v1/sentry/issues`)
            .then((response) => {
                const data = response.data;
                const server = data.projects.server;
                const admin = data.projects.admin;
                
                commit('setLogsServer', server);
                commit('setLogsAdmin', admin);
                commit('setLogsLoading', false);
            })
            .catch((error) => {
                // Set loading to false.
                commit('setLogsLoading', false);
                // Report error to Sentry.
                reportExeption(error);
            });    
        }
    },

}

export default {
    state,
    getters,
    actions,
    mutations
};
