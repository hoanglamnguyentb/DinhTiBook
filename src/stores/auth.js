import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: useLocalStorage("user", ""),
            accessToken : useLocalStorage("accessToken", ""),
        }
    },
    getters: {
        getUser: state => state.user,
        getAccessToken: state => state.accessToken
    },
    
    actions: {
        changeUser(user) {
            this.user = user
        },
        changeAccessToken(accessToken) {
            this.accessToken = accessToken
        },
    }
})