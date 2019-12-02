import swapStyleSheet from '../../lib/helpers/dom';

const state = {
    theme: localStorage.getItem('theme_sheet') || 'default.css',
}

const getters = {
    theme: (state) => state.theme,
}

const mutations = {
    setTheme: (state, data) => state.theme = data,
}

const actions = {

    /**
     * Loads the current theme.
     * @param state
     * @param theme
     */
    loadTheme({commit}) {
        commit('setTheme', state.theme);
        // eslint-disable-next-line
        swapStyleSheet(state.theme);
    },

    /**
     * Changes the theme
     * @param state
     * @param theme
     */
    changeTheme({commit}, theme) {

        switch (theme) {
            case 'dark.css':
                commit('setTheme', 'default.css');
                // eslint-disable-next-line
                swapStyleSheet(`default.css`);
                break;

            case 'default.css':
                commit('setTheme', 'dark.css');
                // eslint-disable-next-line
                swapStyleSheet(`dark.css`);
                break;
        }
    },

}

export default {
    state,
    getters,
    actions,
    mutations
};
