import axios from 'axios';
import { URL_API, LIMIT, NEXT } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

const state = {
    feedback: [],
    feedbackSkip: 0,
    feedbackCount: 0,
    isLoading: true,
};

const getters = {
    feedback: state => state.feedback,
    feedbackCount: state => state.feedbackCount,
    isFeedbackLoading: state => state.isLoading,
    feedbackSkip: (state) => state.feedbackSkip,

};

const mutations = {
    setFeedback: (state, feedback) => state.feedback = feedback,
    setFeedbackCount: (state, feedbackCount) => state.feedbackCount = feedbackCount,
    setLoading: (state, isLoading) => state.isLoading = isLoading,

    deleteFeedback: (state, id) => {
        const index = state.feedback.findIndex((feedback) => feedback._id === id);

        if (index !== -1) {
            state.feedbackCount--;
            state.feedback.splice(index, 1);    
        }
    },

    setFeedbackSkip: (state, value) => {
        // Change state only if user is online.
        if (navigator.onLine) {
            state.feedbackSkip = state.feedbackSkip += value
        }
    }
};

const actions = {
    // Load all the Feedback.
    async fetchFeedback({commit, state}) {

        // Start loading.
        commit('setLoading', true);

        // HTTP request.
        await axios
        .get(`${URL_API}/v1/feedback?limit=${LIMIT}&skip=${state.feedbackSkip}`)
        .then((response) => {
            // Set words.
            commit('setFeedback', response.data.response.document);

            // Set word count
            commit('setFeedbackCount',response.data.response.count);
            
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
    
    // Search in all the Feedback.
    async searchFeedback({commit, dispatch}, query) {
        const search = !!query; 

        // // Making sure that there is content.
        // if (search) {
        //     // Start loading.
        //     commit('setLoading', true);
        //     // axios http request.
        //     await axios
        //     .get(`${URL_API}/v2/search/users?search=${query}`)
        //     .then((response) => {
        //         // Set users.
        //         commit('setUsers', response.data.users);
        //         // No longer loading.
        //         commit('setLoading', false);
        //     })
        //     .catch((error) => {
        //         // No longer loading.
        //         commit('setLoading', false);
        //         // Report error to Sentry.
        //         reportExeption(error);
        //     });
        // } else {
        //     dispatch('fetchUsers');
        // }
    },

    // Load more Feedback.
    async updateSkip({commit}, value) {
        // Change more skip state.
        commit('setFeedbackSkip', value);
    },

    // Delete a single Feedback
    async deleteFeedback({commit}, id) {
        // Warn user before deleting.
        // eslint-disable-next-line
         swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user",
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
                .delete(`${URL_API}/v1/feedback/${id}`)
                .then(() => {
                    // Delete user.
                    commit('deleteFeedback', id);
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
