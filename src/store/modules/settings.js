import swapStyleSheet from '../../lib/helpers/dom';

const state = {
    theme: localStorage.getItem('theme_sheet'),
}

const getters = {
    theme: (state) => state.theme,
}

const mutations = {
    setTheme: (state, data) => state.theme = data,
}

const actions = {

    /**
     * Changes the theme
     * @param state
     * @param theme
     */
    changeTheme({commit}, theme) {

        switch (theme) {
            case 'dark.css':
                commit('setTheme', 'light.css');

                // eslint-disable-next-line
                swapStyleSheet(`light.css`);
                break;

            case 'light.css':
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
