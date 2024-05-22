import APIService from "../../helpers/ApiService"
/* eslint-disable */
export const state = {
    currentUser: sessionStorage.getItem('authUser'),
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
    }
}

export const getters = {
    loggedIn(state) {
        return !!state.currentUser
    }
}

export const actions = {
    init({ state, dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { username, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return APIService.post(username, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    },

    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
        commit('SET_CURRENT_USER', null)
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-unused-vars
            // APIService.logout().then((response) => {
            //     resolve(true);
            // }).catch((error) => {
            //     reject(this._handleError(error));
            // })
        });
    },

    // register the user
    // register({ commit, dispatch, getters }, { username, email, password } = {}) {
    //     if (getters.loggedIn) return dispatch('validate')

    //     return getFirebaseBackend().registerUser(username, email, password).then((response) => {
    //         const user = response
    //         commit('SET_CURRENT_USER', user)
    //         return user
    //     });
    // },

    // register the user
    // eslint-disable-next-line no-unused-vars
    // resetPassword({ commit, dispatch, getters }, { email } = {}) {
    //     if (getters.loggedIn) return dispatch('validate')

    //     return getFirebaseBackend().forgetPassword(email).then((response) => {
    //         const message = response.data
    //         return message
    //     });
    // },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    // validate({ commit, state }) {
    //     if (!state.currentUser) return Promise.resolve(null)
    //     const user = APIService().getAuthenticatedUser();
    //     commit('SET_CURRENT_USER', user)
    //     return user;
    // },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.sessionStorage.setItem(key, JSON.stringify(state))
}
