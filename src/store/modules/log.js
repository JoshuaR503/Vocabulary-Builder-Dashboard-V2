import axios from 'axios';
import { URL_API } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

const state = {
    logsAdmin: [],
    logsServer: [],
    logsLoading: true,
    totalLogs: 0
}

const getters = {
    logsAdmin: (state) => state.logsAdmin,
    logsServer: (state) => state.logsServer,
    logsLoading: (state) => state.logsLoading,
    totalLogs: (state) => state.totalLogs
}

const mutations = {
    setLogsAdmin: (state, data) => state.logsAdmin = data,
    setLogsServer: (state, data) => state.logsServer = data,
    setLogsLoading: (state, data) => state.logsLoading = data,
    setTotalLogs: (state, data) => state.totalLogs = data,
}

const actions = {
    /**
     * Loads the logs from Sentry.
     * @param state
     * @param commit
     */
    async loadLogs({commit}) {
        // Start loading
        commit('setLogsLoading', true);
        await axios
        .get(`${URL_API}/v1/sentry/issues`)
        .then((response) => {

            const serverLogs = response.data.projects.server;
            const adminLogs = response.data.projects.admin;

            commit('setLogsServer', serverLogs);
            commit('setLogsAdmin', adminLogs);
            commit('setTotalLogs', serverLogs.length + adminLogs.length);
            commit('setLogsLoading', false);
        })
        .catch((error) => {
            // Set loading to false.
            commit('setLogsLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

    /**
     * Deletes an issue from Sentry
     * @param state
     * @param commit
     */
    async deleteIssue({commit, dispatch}, id, ) {
        // Start loading
        commit('setLogsLoading', true);
        await axios
        .delete(`${URL_API}/v1/sentry/issues/${id}`)
        .then(() => dispatch('loadLogs'))
        .catch((error) => {
            // Set loading to false.
            commit('setLogsLoading', false);
            // Report error to Sentry.
            reportExeption(error);
        });
    },

}

export default {
    state,
    getters,
    actions,
    mutations
};
